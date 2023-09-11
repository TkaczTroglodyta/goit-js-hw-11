import './sass/main.scss';
import PixabayApi from './js/pixabay-api';
import { sltbox } from './js/sltbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// references first

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  morePicsBtn: document.querySelector('.more-pics'),
};

const PixabayApi = new PixabayApi();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  refs.gallery.innerHTML = '';
  PixabayApi.query = e.currentTarget.elements.searchQuery.value.trim();
  PixabayApi.resetPage();
  if (PixabayApi.query === '') {
    Notify.warning('Please, fill the search field');
    return;
  }
  fetchGallery();
}

async function fetchGallery() {
  refs.morePicsBtn.classList.add('is-hidden');
  const { hits, totalHits } = await PixabayApi.fetchGallery();
  if (!hits.length) {
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    refs.morePicsBtn.classList.add('is-hidden');
    return;
  }
}
