import { refs } from './refs';
import { picsGallery } from './sltbox';

export function createGallery(elements) {
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
