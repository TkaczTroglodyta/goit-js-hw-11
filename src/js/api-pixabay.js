import axios from 'axios';

export default class PixabayApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.PICS_ON_PAGE = 40;
  }
  async fetchGallery() {
    const axiosOptions = {
      method: 'get',
      url: 'https://pixabay.com/api/',
      params: {
        key: '39348553-b34e3385b253929ebea277ff8',
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: `${this.page}`,
        per_page: `${this.PICS_ON_PAGE}`,
      },
    };
    try {
      const response = await axios(axiosOptions);
      const data = response.data;
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  addPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
