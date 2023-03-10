import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


//Interfaz para representar la Pelicula

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  original_language: string;
  release_date: string;
}

@Component({
  selector: 'app-pantalla1',
  templateUrl: './pantalla1.component.html',
  styleUrls: ['./pantalla1.component.css']
})

export class Pantalla1Component {
  
  //Clave de la API
  api_key = '61d95d189a71b4e5391e08086df51f4c'
  //Array de las peliculas
  movies: Movie[] = [];
  searchText = '';
  //Array de las peliculas filtradas
  filtradoPelicula: Movie[] = [];
  //Indice de la pelicula seleccionada y pelicula seleccionada
  selectedMovieIndex: number | null = null;
  selectedMovie: Movie | null = null;
  //Para mostrar que la pelicula esta marcada
  selectedMovieClass = '';
  //Id de la pelicula seleccionada
  selectedMovieId: number | null = null;
  
//Inicializo con la lista de peliculas populares, para que no aparezca vacio
  constructor(private http: HttpClient) {
    this.http.get<any>(`https://api.themoviedb.org/3/movie/popular?api_key=${this.api_key}&language=es&page=1`)
      .subscribe(data => {
        this.movies = data.results;
      });
  }

  //Metodo para hacer la busqueda de peliculas
  search() {
    if (this.searchText === '') {
      this.filtradoPelicula = [];
      this.selectedMovieIndex = null;
      this.selectedMovie = null;
      this.selectedMovieClass = '';
      return;
    }
    //La peticion Http para obtener cualquier pelicula que contenga el texto buscado
    this.http.get<any>(`https://api.themoviedb.org/3/search/movie?api_key=${this.api_key}&language=es&query=${this.searchText}`)
    .subscribe(data => {
      this.filtradoPelicula = data.results;});

      this.selectedMovieIndex = null;
      this.selectedMovie = null;
    
  }

  //Metodo para seleccionar una pelicula
  selectMovie(id: number) {
  this.selectedMovieId = id;
  this.selectedMovie = this.filtradoPelicula.find(movie => movie.id === this.selectedMovieId)
    || this.movies.find(movie => movie.id === this.selectedMovieId)
    || null;
    //Para resaltar la pelicula seleccionada
  this.selectedMovieClass = 'selected';
}


}