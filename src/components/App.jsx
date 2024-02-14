import React, { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import Modal from './CustomModal';

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
      const apiKey = 'your_pixabay_api_key'; // Replace with your actual API key
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
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && <Button onClick={this.handleLoadMore} />}
        {selectedImage && (
          <Modal
            isOpen={true}
            imageUrl={selectedImage}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export default App;
