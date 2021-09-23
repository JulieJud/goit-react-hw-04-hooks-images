import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchImages = async (imageName, pageNumber) => {
  const { data } = await axios.get(
    `/?q=${imageName}&page=${pageNumber}&key=22647650-093efc913fe4b5bfd764725e8&image_type=photo&orientation=horizontal&per_page=12`,
  );
  console.log(data);
  return data.hits;
};

export default fetchImages;
