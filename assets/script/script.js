/* FORM SEARCH */

const VIRTUAL_KEYBOARD = document.querySelector('.form__keyboard');
const CONTAINER_VK = document.querySelector('.form__virtual-keyboard');
const CANCEL_BTN = document.querySelector('.form__cancel');
const TEXT_INPUT = document.querySelector('.form__text');
const SEARCH_BTN_ICON = document.querySelector('.form__search-icon');
const SEARCH_BTN = document.querySelector('.form__search');
const SEARCH_RESULTS = document.querySelector('.container__message-container__message');
const POSTS_CONTAINER = document.querySelector('.slider__wrapper');
const SLIDER_ITEM = document.querySelectorAll('.slider__item');
const ITEM_CARD = document.querySelectorAll('.slider__item__card');
const CARD_IMAGE = document.querySelectorAll('.slider__item__card-image');
const CARD_HEADER = document.querySelectorAll('.slider__item__card-header');
const MOVIE_TITLE = document.querySelectorAll('.btn-link');
const IMDB_RAITING = document.querySelectorAll('.imdb-rating');
const MOVIE_YEAR = document.querySelectorAll('.year');

VIRTUAL_KEYBOARD.addEventListener('click', () => {
    if (CONTAINER_VK.classList.value != 'form__virtual-keyboard show animation-show') {
        CONTAINER_VK.classList.add('show');
        setTimeout(function () {
            CONTAINER_VK.classList.add('animation-show');
        }, 20);
    } else {
        CONTAINER_VK.classList.remove('animation-show');
        setTimeout(function () {
            CONTAINER_VK.classList.remove('show');
        }, 600);
    }
    TEXT_INPUT.focus();
});

TEXT_INPUT.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();

        submitForm();
    } else {
        return false;
    }
})

CONTAINER_VK.addEventListener('mousedown', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        console.log(1);
        submitForm();
    } else {
        return false;
    }
})

function submitForm() {
    let words = TEXT_INPUT.value.trim();

    if (words) {
        searchMovies(words, 1);
    }
}

CANCEL_BTN.addEventListener('click', () => {
    TEXT_INPUT.value = '';
    TEXT_INPUT.focus();
})

SEARCH_BTN_ICON.addEventListener('click', () => {
    submitForm();
})

SEARCH_BTN.addEventListener('click', () => {
    submitForm();
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
        SEARCH_RESULTS.innerHTML = 'Showing results for <em><strong>' + text + '</strong></em>';
        const url = `https://www.omdbapi.com/?s=${text}&page=${page}&apikey=aad8de66`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === 'True') {
            let countMovie = data.Search.length;

            async function getMoviRating(imdbID) {
                const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=aad8de66`;

                const res = await fetch(url);
                const data = await res.json();


                return data.imdbRating;
            }

            try {
                for (let i = 0; i < countMovie; i++) {
                    let imdbRating = await getMoviRating(data.Search[i].imdbID);

                    if (data.Search[i].Poster === 'N/A') {
                        CARD_IMAGE[i].style.backgroundImage = 'url(assets/img/no-poster.png)';
                    } else {
                        CARD_IMAGE[i].style.backgroundImage = 'url(' + (data.Search[i].Poster) + ')';
                    }

                    MOVIE_TITLE[i].innerHTML = data.Search[i].Title;
                    MOVIE_TITLE[i].setAttribute('href', 'https://www.imdb.com/title/' + (data.Search[i].imdbID) + '/videogallery/');
                    IMDB_RAITING[i].innerHTML = 'IMDb: ' + imdbRating;
                    MOVIE_YEAR[i].innerHTML = data.Search[i].Year;
                }
            } catch (e) {
                SEARCH_RESULTS.innerHTML = 'Request limit reached!';
            }

        } else if (data.Response === 'False' && page === 1) {
            SEARCH_RESULTS.innerHTML = 'Request limit reached!';
        } else if (data.Response === 'False' && data.Error === 'Request limit reached!') {
            SEARCH_RESULTS.innerHTML = 'No results for' + text + '. Please, try another request';
        } else {
            console.log(data.Error + 'фильмы закончились');
        }

    }

    getMovie();
    // getMovieTitle().catch(error => {
    //     console.log('Error: ' + error.message);
    // })
}








