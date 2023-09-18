import { refs } from './js/refs';
import PixabayApi from './js/pixabay-api';
import { createGallery } from './js/create-gallery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let onScreen = 0;
const getResults = new PixabayApi();

function onSearch(e) {
  e.preventDefault();

  refs.gallery.innerHTML = '';
  getResults.query = e.currentTarget.elements.searchQuery.value.trim();
  getResults.resetPage();

  if (getResults.query === '') {
    Notify.warning('Please, fill the search field');
    return;
  }

  fetchGallery();
}

function morePics() {
  getResults.nextPage();
  fetchGallery();
}

async function fetchGallery() {
  refs.morePicsBtn.classList.add('is-hidden');

  const { hits, totalHits } = await getResults.fetchGallery();
  if (!hits.length) {
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    refs.morePicsBtn.classList.add('is-hidden');
    return;
  }

  createGallery(hits);

  onScreen = getResults.page < Math.ceil(totalHits / 40);

  if (onScreen === false) {
    Notify.failure(
      `We're sorry, but you've reached the end of search results.`
    );
    refs.morePicsBtn.classList.add('is-hidden');
    return;
  }

  if (onScreen === true) {
    Notify.success(`Hooray! We found ${totalHits} images.`);
    refs.morePicsBtn.classList.remove('is-hidden');
    return;
  }
}

refs.searchForm.addEventListener('submit', onSearch);
refs.morePicsBtn.addEventListener('click', morePics);
