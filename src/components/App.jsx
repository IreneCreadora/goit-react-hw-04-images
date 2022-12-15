import { Component } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastParams from '../helpers/ToastParams';
import pixabayAPI from 'API/pixabayAPI';
import '../components/styles.css';

import Searchbar from './searchBar/SearchBar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import Modal from './modal/Modal';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    showModal: false,
    largeImage: '',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.getImages();
    }
  }

  onChangeQuery = searchQuery => {
    this.setState({
      images: [],
      currentPage: 1,
      searchQuery: searchQuery,
      error: null,
    });
  };

  getImages = async () => {
    const { currentPage, searchQuery } = this.state;

    this.setState({
      isLoading: true,
    });

    try {
      const { hits } = await pixabayAPI(searchQuery, currentPage);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        currentPage: prevState.currentPage + 1,
      }));

      if (currentPage !== 1) {
        this.scrollOnLoadButton();
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  clickOnImage = fullImageUrl => {
    console.log(fullImageUrl);
    this.setState({ largeImage: fullImageUrl });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      // largeImage: '',
    }));
  };

  scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, isLoading, showModal, largeImage, error } = this.state;
    const needShowLoadMore = images.length > 0 && images.length >= 12;

    return (
      <>
        <Searchbar onSubmit={this.onChangeQuery} />
        <ToastContainer position="center" autoClose={2000} />

        <ImageGallery images={images} onImageClick={this.clickOnImage} />

        {needShowLoadMore && <Button onClick={this.getImages} />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
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
}

export default App;
