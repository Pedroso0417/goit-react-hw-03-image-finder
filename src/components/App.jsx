import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import css from './App.module.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      images: [],
      isLoading: false,
      currentPage: 1,
      selectedImage: null,
    };
  }

  handleSearchSubmit = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handleImageClick = imageUrl => {
    this.setState({
      selectedImage: imageUrl,
    });
  };

  handleCloseModal = () => {
    this.setState({
      selectedImage: null,
    });
  };

  fetchData = async () => {
    const { searchQuery, currentPage } = this.state;
    this.setState({
      isLoading: true,
    });

    try {
      const apiKey = '41732117-59258c5357db5fde0d38d4929'; // Replace with your actual API key
      const perPage = 12;
      const apiUrl = `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchData();
    }
  }

  render() {
    const { images, isLoading, selectedImage } = this.state;

    return (
      <div className={css.container}>
        <Searchbar
          className={css.searchbar}
          onSubmit={this.handleSearchSubmit}
        />
        <ImageGallery
          className={css.imageGallery}
          images={images}
          onImageClick={this.handleImageClick}
        />
        {isLoading && <Loader className={css.loader} />}
        {images.length > 0 && (
          <Button className={css.button} onClick={this.handleLoadMore} />
        )}
        {selectedImage && (
          <Modal
            className={css.modal}
            isOpen={!!selectedImage} // Use the selectedImage state to manage modal visibility
            imageUrl={selectedImage}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export { App };
