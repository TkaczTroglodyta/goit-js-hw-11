import PixabayApi from './js/pixabay-api';
import { picsGallery } from './js/sltbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// References

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  morePicsBtn: document.querySelector('.more-pics'),
};

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

  onGalleryCreate(hits);

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

function onGalleryCreate(elements) {
  const markup = elements
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="pict-card">
    <a href="${largeImageURL}">
      <img class="pict-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="pict-card__info">
      <p class="pict-card__txt">
        <strong>Likes</strong>
        ${likes}
      </p>
      <p class="pict-card__txt">
        <strong>Views</strong>
        ${views}
      </p>
      <p class="pict-card__txt">
        <strong>Comments</strong>
        ${comments}
      </p>
      <p class="pict-card__txt">
        <strong>Downloads</strong>
        ${downloads}
      </p>
    </div>
    </div>`;
      }
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  picsGallery.refresh();
}

refs.searchForm.addEventListener('submit', onSearch);
refs.morePicsBtn.addEventListener('click', morePics);
