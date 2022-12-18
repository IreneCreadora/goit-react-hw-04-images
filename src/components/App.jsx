import { useState, useEffect } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastParams from '../helpers/ToastParams';
import '../components/styles.css';

import Searchbar from './searchBar/SearchBar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import Modal from './modal/Modal';

import pixabayAPI from 'API/pixabayAPI';
function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [largeImage, setlargeImage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    getImages();
    // eslint-disable-next-line
  }, [searchQuery]);

  const onChangeQuery = currentQuery => {
    setImages([]);
    setPage(1);
    setTotalPages(0);
    setQuery(currentQuery);
    setLoading(false);
    setError(null);
  };

  const getImages = async () => {
    setLoading(true);

    try {
      const { images, totalPages } = await pixabayAPI(searchQuery, currentPage);

      setImages(prev => [...prev, ...images]);
      setTotalPages(totalPages);
      setPage(prevPage => prevPage + 1);

      if (currentPage !== 1) {
        scrollOnLoadButton();
      }
    } catch (error) {
      setError({ error });
    } finally {
      setLoading(false);
    }
  };

  const clickOnImage = fullImageUrl => {
    console.log(fullImageUrl);
    setlargeImage(fullImageUrl);
    setModal(true);
  };

  const toggleModal = () => {
    setModal(prev => !prev);
  };

  const scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const needShowLoadMore = totalPages && currentPage !== totalPages;

  return (
    <>
      <Searchbar onSubmit={onChangeQuery} />
      <ToastContainer position="center" autoClose={2000} />

      <ImageGallery images={images} onImageClick={clickOnImage} />

      {needShowLoadMore && <Button onClick={getImages} />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt="" />
        </Modal>
      )}
      {isLoading && <InfinitySpin width="200" color="#4fa94d" />}

      {error &&
        toast.error(
          'Sorry, something went wrong. Please try again',
          toastParams
        )}
    </>
  );
}

export default App;
