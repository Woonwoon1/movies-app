const apiUrl='https://api.themoviedb.org/3/search/movie?api_key=9b823426f94815aebe5d23e2073a1626&query=a';
const IMAG = 'https://image.tmdb.org/t/p/w500/';
const main = document.querySelector('#main');
const form = document.querySelector('#from');
const search = document.querySelector('#search');


async function showMovies(apiUrl) {
    const response = await fetch(apiUrl);     
    const movie = await response.json();
    
    movie.results.forEach(data =>{
        const movieEl=document.createElement('div');
        const title= document.createElement('h2');
        const poster=document.createElement('img')
        title.innerHTML=`${data.title}`;
        poster.src=`${IMAG}${data.poster_path}`;
        movieEl.appendChild(title);
        movieEl.appendChild(poster);
        main.appendChild(movieEl);
    });

}

showMovies(apiUrl);

form.addEventListener('submit',e =>{
    e.preventDefault();
    main.innerHTML ='';

    const searchM = search.value;

    if (searchM) {
        showMovies(apiUrl+searchM);
        search.value='';
    }
})
