import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let galleryImages = new SimpleLightbox('.gallery a', {
  captions: 'true',
  captionSelector: 'img',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  scrollZoom: false,
  scaleImageToRatio: true,
});

export { galleryImages };
