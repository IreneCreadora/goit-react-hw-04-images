import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

const pixabayAPI = async (searchQuery, currentPage) => {
  // const APY_KEY = '30542917-0408f4782b72ddf35d713f34b';

  const options = {
    params: {
      key: '30542917-0408f4782b72ddf35d713f34b',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      q: searchQuery,
      page: currentPage,
    },
  };

  const { data } = await axios.get(`/api/?`, options);
  console.log(data);
  const images = data.hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
    id,
    tags,
    webformatURL,
    largeImageURL,
  }));
  const totalPages = Math.ceil(data.totalHits / options.params.per_page);
  return { images, totalPages };
};

export default pixabayAPI;
