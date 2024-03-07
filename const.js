const API_KEY = '553b3cfe2da6b646f996bb9e3e873a7e'
const API_PORTADA = 'https://image.tmdb.org/t/p/w500/'

// Article Main
const mainPelis = document.getElementById('cont-pelis')

//bucsar
const inputBox = document.getElementById('inpBuscar')

//paginacion
const footerBtns = document.getElementById('contBtns')
const btnPrevious = document.getElementById('pagePrev')
const spanPage = document.getElementById('spanPage')
const btnNext = document.getElementById('pageNext')

// Popular
const contBtns = document.getElementById('cont-popular')
// popular dia-semana
const btnTimes = document.getElementById('btn-time')


//favs
const botonesFavoritos = document.querySelectorAll('.boton-fav')
const peliCards = document.querySelectorAll('.movie-card')
const spanFav = document.getElementById('spanfav')
const botonFavorito = document.querySelector('#botonFavorito')
const mainFav = 'main'


//filtros
const inpBuscar = document.getElementById('inpBuscar')
const contFiltros = document.getElementById('divFiltro')


// generos id
const generosID = {
    "genres": [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
    ]
  }