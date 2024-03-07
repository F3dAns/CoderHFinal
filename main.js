let day = 'day'
let page = 1
let genero = ''
let palabra = ''
let misFavoritos = []



function actualizarLocal() {
    localStorage.setItem('data' , JSON.stringify(misFavoritos))
}
function cargarLocal(){
    const localFavoritos = localStorage.getItem('data')
    if (localFavoritos){
        misFavoritos = JSON.parse(localFavoritos)
    }
}
cargarLocal()
contadorFav()

function guardarLocal(infoPelis){
    const index = misFavoritos.findIndex(element => element.id === infoPelis.id)
    if (index > -1) {
        swal.fire({
            title: '¿Deseas eliminarlo de Mis Favoritos?',
            width: '600px',
            position: 'top',
            icon: 'question',
            showConfirmButton: true,
            showDenyButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                misFavoritos.splice(index, 1)
                actualizarLocal()
                contadorFav()
                Swal.fire({
                    title: 'Eliminado de Mis Favoritos',
                    icon: 'success',
                    position: 'top',
                    timer: 1000,
                    showConfirmButton: false
                    
                })
            }
        })

    } else {
        swal.fire({
            title: '¿Deseas agregarlo a Mis Favoritos?',
            position: 'top',
            width: '600px',
            icon: 'question',
            showConfirmButton: true,
            showDenyButton: true,

        }).then((result) => {
            if (result.isConfirmed) {
                misFavoritos.push(infoPelis)
                actualizarLocal()
                contadorFav()
                Swal.fire({
                    title: 'Agregado a Mis Favoritos',
                    icon: 'success',
                    position: 'top',
                    timer: 1000,
                    showConfirmButton: false
                    
                })

                
            }

        })

    }
}
function mostrarError(){
    const divError = document.createElement('div')
    const txtError = document.createElement('h2')
    txtError.textContent = 'Ha ocurrido un error'
    divError.appendChild(txtError)
    mainPelis.appendChild(divError)
}
function eliminarFavs(pelicula) {
    const index = misFavoritos.findIndex(item => item.title === pelicula.title)
    if (index > -1) {
        swal.fire({
            title: '¿Deseas eliminarlo de Mis Favoritos?',
            width: '600px',
            position: 'top',
            icon: 'question',
            showConfirmButton: true,
            showDenyButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                misFavoritos.splice(index, 1)
                actualizarLocal()
                contadorFav()
                Swal.fire({
                    title: 'Eliminado de Mis Favoritos',
                    icon: 'success',
                    position: 'top',
                    timer: 1000,
                    showConfirmButton: false,
                })
                mostrarFavs() 
            }
        })
    }
}
function contadorFav(){
    spanFav.textContent = misFavoritos.length
}
function cambiarDay(nuevoValor){
    day = nuevoValor
}
function filtrar(){
    genero = document.getElementById('filtro-container').value
    page = 1
    agregarPelis()
}
function actualizarBotonPrev() {
    btnPrevious.disabled = page <= 1
}
spanPage.innerHTML = page
actualizarBotonPrev()

function sumarPage() {
    page += 1
    mainPelis.innerHTML = ""
    agregarPelis()
    spanPage.innerHTML = page
    actualizarBotonPrev()
}
function restarPage() {
    if (page > 1) {
        page -= 1
        mainPelis.innerHTML = ""
        agregarPelis()
        spanPage.innerHTML = page
        actualizarBotonPrev()
    }
}


function buscarPalabra(){
    if ((inputBox.value).trim() === ''){
        agregarPelis()
    }else{
        palabra = inputBox.value
        console.log(palabra)
        mostrarBusqueda()
        inputBox.value = ''

    }
}
inputBox.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        buscarPalabra()
        palabra = inputBox.value
        
    }
})

function mostrarPopular(){
    mainPelis.innerHTML = ""
    contBtns.innerHTML = ""
    footerBtns.innerHTML = ""
    contFiltros.style.display = 'block'

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTNiM2NmZTJkYTZiNjQ2Zjk5NmJiOWUzZTg3M2E3ZSIsInN1YiI6IjY1ZGQ3YmIxNWVkOGU5MDE3YzM1ODYzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.53jEKCjAuVW3GkYkXWCsUq7E-SqiEba2idAxoEdWcjM'
        }
      } 
      fetch(`https://api.themoviedb.org/3/trending/movie/${day}?language=en-US` , options)
        .then(response => response.json())
        .then(response => {
            if (Array.isArray(response.results)) {
                const divBtns = document.createElement('div')
                divBtns.classList.add('cont-btns') 
                const hoyBtn = document.createElement('button')
                hoyBtn.classList.add('btn-pupular')
                hoyBtn.textContent = 'Hoy'
                hoyBtn.id = 'hoyBtn'
                hoyBtn.addEventListener('click', function(){
                    if (day === 'week'){
                        cambiarDay('day')
                        mostrarPopular()
                    }
                })
                divBtns.appendChild(hoyBtn) 
                const semanaBtn = document.createElement('button')
                semanaBtn.classList.add('btn-pupular')
                semanaBtn.textContent = 'Esta Semana'
                semanaBtn.id = 'semanaBtn'
                semanaBtn.addEventListener('click', function(){
                    if (day === 'day'){
                        cambiarDay('week')
                        mostrarPopular()
                    }
                })
                divBtns.appendChild(semanaBtn)   
                contBtns.appendChild(divBtns)
                response.results.forEach(pelicula => {
                    //movie card
                    const movieCard = document.createElement('div')
                    movieCard.classList.add('movie-card')
                    //movie img
                    const movieImg = document.createElement('div')
                    movieImg.classList.add('movie-img')
                    const portadaImg = document.createElement('img')
                    portadaImg.src = API_PORTADA + pelicula.poster_path
                    movieImg.appendChild(portadaImg)
                    movieCard.appendChild(movieImg)
                    //movie info
                    const movieInfo = document.createElement('div')
                    movieInfo.classList.add('movie-info')

                    movieCard.appendChild(movieInfo)
                    const movieTitulo = document.createElement('h3')
                    movieTitulo.textContent = pelicula.title
                    movieCard.appendChild(movieTitulo)
                    const divDetalles = document.createElement('div')
                    divDetalles.classList.add('movie-detalles')

                    const movieParrafo = document.createElement('p')
                    const generoNombres = pelicula.genre_ids
                    .map(id => {
                      const genero = generosID.genres.find(g => g.id === id)
                      return genero ? genero.name : null
                    })
                    .filter(nombre => nombre) 
                    .join('-')               
                    movieCard.appendChild(movieParrafo)
                    movieParrafo.textContent = `${generoNombres}`

                    const btnMovies = document.createElement('div')
                    btnMovies.classList.add('movie-btns')
                    //boton
                    const btnFav = document.createElement('button')
                    btnFav.textContent = 'FAVORITOS'
                    btnFav.classList.add('boton-fav')
                    btnFav.id = 'buttonFav'
                    btnFav.addEventListener('click', function(){
                        const infoPelis = {
                            id: pelicula.id,
                            title: pelicula.title,
                            img: API_PORTADA + pelicula.poster_path
                        }
                        guardarLocal(infoPelis)
                        console.log(pelicula.id)
                    })
                    btnMovies.appendChild(btnFav)
                    divDetalles.appendChild(btnMovies)
                    movieCard.appendChild(divDetalles)
                    mainPelis.appendChild(movieCard)

                })
            } else {
                mostrarError()
            } 
        })
        .catch(error => console.error(error))




}
function mostrarFavs(){
    mainPelis.innerHTML = ""
    contBtns.innerHTML = ""
    footerBtns.innerHTML = ""
    contFiltros.style.display = 'none'

    const contCards = document.createElement('div')
    contCards.classList.add('cont-cards')
    if (misFavoritos.length > 0) {
        misFavoritos.forEach(peli => {
            //movie card
            const movieCard = document.createElement('div')
            movieCard.classList.add('movie-card')
            //movie img
            const movieImg = document.createElement('div')
            movieImg.classList.add('movie-img')
            const portadaImg = document.createElement('img')
            portadaImg.src = peli.img
            movieImg.appendChild(portadaImg)
            movieCard.appendChild(movieImg)
            //movie info
            const movieInfo = document.createElement('div')
            movieInfo.classList.add('movie-info')
            const title = document.createElement('h3')
            title.textContent = peli.title
            



            
            const btnDelete = document.createElement('div')
            btnDelete.classList.add('movie-btns')
            const btnDel = document.createElement('button')
            btnDel.classList.add('fa-solid','fa-trash')
            btnDel.addEventListener('click', function(){
                eliminarFavs(peli)
                
            })
            movieInfo.appendChild(title)
            movieCard.appendChild(movieInfo)
            btnDelete.appendChild(btnDel)
            movieCard.appendChild(btnDelete)
            mainPelis.appendChild(movieCard)
        })
    } else{
        const movieCard = document.createElement('div')
        movieCard.classList.add('movie-card')
        //movie info
        const movieInfo = document.createElement('div')
        movieInfo.classList.add('movie-info')
        const title = document.createElement('h3')
        title.textContent = 'No hay pelis favoritas'

        movieInfo.appendChild(title)
        movieCard.appendChild(movieInfo)
        mainPelis.appendChild(movieCard)
    }
}

function mostrarBusqueda(){
    mainPelis.innerHTML = ""
    contFiltros.style.display = 'block'

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTNiM2NmZTJkYTZiNjQ2Zjk5NmJiOWUzZTg3M2E3ZSIsInN1YiI6IjY1ZGQ3YmIxNWVkOGU5MDE3YzM1ODYzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.53jEKCjAuVW3GkYkXWCsUq7E-SqiEba2idAxoEdWcjM'
        }
    }
    fetch(`https://api.themoviedb.org/3/search/movie?query=${palabra}&include_adult=false&language=en-US&page=1`, options)
    .then(res => res.json())
    .then(response => {
        if (Array.isArray(response.results)) {
            const contCards = document.createElement('div')
            contCards.classList.add('cont-cards')


            response.results.forEach(pelicula => {
                //movie card
                const movieCard = document.createElement('div')
                movieCard.classList.add('movie-card')
                //movie img
                const movieImg = document.createElement('div')
                movieImg.classList.add('movie-img')
                const portadaImg = document.createElement('img')
                portadaImg.src = API_PORTADA + pelicula.poster_path
                movieImg.appendChild(portadaImg)
                movieCard.appendChild(movieImg)
                //movie info
                const movieInfo = document.createElement('div')
                movieInfo.classList.add('movie-info')
                movieCard.appendChild(movieInfo)
                const movieTitulo = document.createElement('h3')
                movieTitulo.textContent = pelicula.title
                movieCard.appendChild(movieTitulo)
                const movieParrafo = document.createElement('p')
                const generoNombres = pelicula.genre_ids
                .map(id => {
                  const genero = generosID.genres.find(g => g.id === id)
                  return genero ? genero.name : null
                })
                .filter(nombre => nombre) 
                .join('-')               
                movieCard.appendChild(movieParrafo)
                movieParrafo.textContent = `${generoNombres}`

                const divDetalles = document.createElement('div')
                divDetalles.classList.add('movie-detalles')
                const duracion = document.createElement('div')
                duracion.classList.add('movie-duration')
                

                const btnMovies = document.createElement('div')
                btnMovies.classList.add('movie-btns')
                const btnFav = document.createElement('button')
                btnFav.textContent = 'FAVORITOS'
                btnFav.addEventListener('click', function(){
                    const infoPelis = {
                        id: pelicula.id,
                        title: pelicula.title,
                        img: API_PORTADA + pelicula.poster_path
                    }
                    guardarLocal(infoPelis)
                    console.log(pelicula.id)
                })

                
                btnMovies.appendChild(btnFav)
                divDetalles.appendChild(duracion)
                divDetalles.appendChild(btnMovies)
                movieCard.appendChild(divDetalles)
                mainPelis.appendChild(movieCard)

            })


        } else {
            mostrarError()
        }
    })


}

function agregarPelis(){
    mainPelis.innerHTML = ""
    contFiltros.style.display = 'block'

    const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}&with_genres=${genero}`
    fetch(API_URL)
    .then(res => res.json())
    .then(response => {
        if (Array.isArray(response.results)) {
            const contCards = document.createElement('div')
            contCards.classList.add('cont-cards')


            response.results.forEach(pelicula => {
                //movie card
                const movieCard = document.createElement('div')
                movieCard.classList.add('movie-card')
                //movie img
                const movieImg = document.createElement('div')
                movieImg.classList.add('movie-img')
                const portadaImg = document.createElement('img')
                portadaImg.src = API_PORTADA + pelicula.poster_path
                movieImg.appendChild(portadaImg)
                movieCard.appendChild(movieImg)
                //movie info
                const movieInfo = document.createElement('div')
                movieInfo.classList.add('movie-info')
                movieCard.appendChild(movieInfo)
                const movieTitulo = document.createElement('h3')
                movieTitulo.textContent = pelicula.title
                movieCard.appendChild(movieTitulo)
                const movieParrafo = document.createElement('p')
                const generoNombres = pelicula.genre_ids
                .map(id => {
                  const genero = generosID.genres.find(g => g.id === id)
                  return genero ? genero.name : null
                })
                .filter(nombre => nombre) 
                .join('-')               
                movieCard.appendChild(movieParrafo)
                movieParrafo.textContent = `${generoNombres}`

                const divDetalles = document.createElement('div')
                divDetalles.classList.add('movie-detalles')
                const duracion = document.createElement('div')
                duracion.classList.add('movie-duration')
                

                const btnMovies = document.createElement('div')
                btnMovies.classList.add('movie-btns')
                const btnFav = document.createElement('button')
                btnFav.textContent = 'FAVORITOS'
                btnFav.addEventListener('click', function(){
                    const infoPelis = {
                        id: pelicula.id,
                        title: pelicula.title,
                        img: API_PORTADA + pelicula.poster_path
                    }
                    guardarLocal(infoPelis)
                    console.log(pelicula.id)
                })

                
                btnMovies.appendChild(btnFav)
                divDetalles.appendChild(duracion)
                divDetalles.appendChild(btnMovies)
                movieCard.appendChild(divDetalles)
                mainPelis.appendChild(movieCard)

            })


        } else {
            mostrarError()
        }
    })


}



agregarPelis()



