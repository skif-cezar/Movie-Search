/* FORM SEARCH */

const VIRTUAL_KEYBOARD = document.querySelector('.form__keyboard');
const CONTAINER_VK = document.querySelector('.form__virtual-keyboard');
const CANCEL_BTN = document.querySelector('.form__cancel');
const TEXT_INPUT = document.querySelector('.form__text');
const SEARCH_BTN_ICON = document.querySelector('.form__search-icon');
const SEARCH_BTN = document.querySelector('.form__search');
const POSTS_CONTAINER = document.querySelector('.slider__wrapper');

VIRTUAL_KEYBOARD.addEventListener('click', () => {
    if(CONTAINER_VK.classList.value != 'form__virtual-keyboard show animation-show') {
    CONTAINER_VK.classList.add('show');
    setTimeout(function() {
        CONTAINER_VK.classList.add('animation-show');
    }, 20);
    } else {
        CONTAINER_VK.classList.remove('animation-show');
        setTimeout(function() {
            CONTAINER_VK.classList.remove('show');
        }, 600);
    }
});

CANCEL_BTN.addEventListener('click', () => {
    TEXT_INPUT.value = '';
if(document.querySelector('.form__keyboard').style.display == 'block'){console.log(1)} else { console.log(2)};
})

SEARCH_BTN_ICON.addEventListener('click', () => {
    let words = TEXT_INPUT.value.trim();

    if(words) {
        searchMovies(words, 1);
    }
    // console.log(translateWords(ред));
    
})

SEARCH_BTN.addEventListener('click', () => {
    // getMovieTitle(1);
})

function searchMovies(words, page) {

    async function translateWords() {
        const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200514T063917Z.bdaba90a397d7386.03ddd58951e1548fe540cda4b3190298cb7fd4b2&text=${words}&lang=ru-en`;
       
        const res = await fetch(url);
        const data = await res.json();
        
        return data.text[0]; 
    }
    
    async function getMovie() {
        let text = await translateWords();
        const url = `https://www.omdbapi.com/?s=${text}&page=${page}&apikey=1cb7d65e`;
               
        const res = await fetch(url);
        const data = await res.json();
        
        if(data.Response === 'True') {
            let countMovie = data.Search.length;
            let posts = [...POSTS_CONTAINER.querySelectorAll('.slider__item')];
            
            for (let i = 0; i < posts.length; i++) {
                posts[i].remove();
            }

            async function getMoviRating(imdbID) {
                const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=9b67fc54`;
       
                const res = await fetch(url);
                const data = await res.json();
                
                return data.imdbRating; 
            }

            for(let i = 0; i < countMovie; i++) {
                let sliderItem = document.createElement('div');
                let itemCard = document.createElement('div');
                let cardImage = document.createElement('div');
                let cardHeader = document.createElement('div');
                let movieTitle = document.createElement('a');
                let imdbRatingDiv = document.createElement('div');
                let year = document.createElement('div');
                let imdbRating = await getMoviRating(data.Search[i].imdbID);

                sliderItem.classList = 'slider__item';
                itemCard.classList = 'slider__item__card card';
                cardImage.classList = 'slider__item__card-image';
                cardImage.style.backgroundImage = 'url('+(data.Search[i].Poster)+')';
                cardHeader.classList = 'slider__item__card-header';
                movieTitle.classList = 'btn btn-link';
                movieTitle.innerHTML = data.Search[i].Title;
                movieTitle.setAttribute('target', '_blank');
                movieTitle.setAttribute('href', 'https://www.imdb.com/title/'+(data.Search[i].imdbID)+'/videogallery/');
                imdbRatingDiv.classList = 'badge badge-pill badge-warning imdb-rating rounded';
                imdbRatingDiv.innerHTML = imdbRating;
                year.classList = 'badge badge-pill badge-info year rounded';
                year.innerHTML = data.Search[i].Year;

                POSTS_CONTAINER.append(sliderItem);
                sliderItem.append(itemCard);
                itemCard.append(cardImage);
                itemCard.append(cardHeader);
                cardHeader.append(movieTitle);
                cardHeader.append(imdbRatingDiv);
                cardHeader.append(year);

            }

        } else if(data.Response === 'False' && page === 1) {
            console.log(data.Error+'нет фильмов');
        } else {
            console.log(data.Error+'фильмы закончились');
        }
        
    }

    getMovie();
            // getMovieTitle().catch(error => {
            //     console.log('Error: ' + error.message);
            // })
}







