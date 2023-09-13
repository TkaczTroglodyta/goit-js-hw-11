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
refs.morePicsBtn.addEventListener('click', onMorePics);

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

function onMorePics() {
  PixabayApi.addPage();
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
  onGalleryCreate(hits);

  onScreen = PixabayApi.page < Math.ceil(totalHits / 40);

  if (onScreen !== true) {
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
      <div class="info">
        <p class="info-item"><strong>Likes</strong>${likes}</p>
        <p class="info-item"><strong>Views</strong>${views}</p>
        <p class="info-item"><strong>Comments</strong>${comments}</p>
        <p class="info-item"><strong>Downloads</strong>${downloads}</p>
      </div>
    </div>`;
      }
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  PixabayApi.refresh();
}
