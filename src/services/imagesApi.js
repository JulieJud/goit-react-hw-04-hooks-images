import axios from 'axios';

//axios.defaults.baseURL = 'https://pixabay.com/api';

const getImageByAxious = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '22647650-093efc913fe4b5bfd764725e8',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: '12',
  },
});

const fetchImages = async (imageName, pageNumber) => {
  const { data } = await getImageByAxious(
    `/?q=${imageName}&page=${pageNumber}`,
  );
  console.log(data);
  return data.hits;
};

export default fetchImages;
