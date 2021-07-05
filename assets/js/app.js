
(async function() {

    const lang = window.navigator.language
    
    const apiKey = "ac4a56f4c9bd570b50dd694829864854"
    const button_plus = document.getElementsByClassName('button-plus')
    const button_close = document.getElementsByClassName('button-close')

    const randomMovies = await getRandomMovies(apiKey, lang)
    insertMovieInPage(randomMovies)

    button_plus.addEventListener('click', function() {
        button_plus.style.display = 'none'
        button_close.style.display = 'block'
        document.getElementById('overview').style.display = 'block'
        document.getElementById('poster-img').setAttribute('style', 'filter: blur(3px)')
    })

    button_close.addEventListener('click', function() {
        button_close.style.display = 'none'
        button_plus.style.display = 'block'
        document.getElementById('overview').style.display = 'none'
        document.get('poster-img').removeAttribute('style', 'filter: blur(0)')
    })

}())

async function getRandomMovies(api, lang)
{
    const movies = fetch('https://api.themoviedb.org/3/search/multi?api_key=' + api + '&language=' + lang + '&page=1&include_adult=true&query=Action')
    .then(response => {
        if (response.ok) {
            return response.json()
        }
    })
    .then(resMovies => {
        return resMovies
    })
    .catch(console.warn);

    return movies
}

function insertMovieInPage(movies)
{
    document.getElementById('articles').innerHTML = ''
    
    movies.results.forEach((movie) => {
        getTemplate(movie)
    })

}

function getTemplate(movie)
{
    console.log(movie.name)
    const moviesList = document.getElementById('articles')

    const template = document.getElementById('template-article')
    const cloneTemplate = document.importNode(template.content, true)

    let name
    let image

    if (movie.name != "" && movie.name != null) {
        name = movie.name
    }else {
        name = movie.original_title
    }

    if (movie.poster_path != "" && movie.poster_path != null) {
        image = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path
    }else {
        image = 'assets/img/no-poster.png'
    }

    cloneTemplate.getElementById('poster-img').src = image
    cloneTemplate.getElementById('overview-text').textContent = movie.overview
    cloneTemplate.getElementById('title-movie').innerHTML = `${name} - Available on <a href="">Netflix</a>`
    cloneTemplate.getElementById('date-movie').textContent = movie.release_date

    moviesList.appendChild(cloneTemplate)
}