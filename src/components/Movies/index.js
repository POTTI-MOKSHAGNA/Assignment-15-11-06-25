import './index.css';
import { Component } from 'react';
import TabItem from '../TabItem';
import MovieCard from '../MovieCard';
import Loader from 'react-loader-spinner'

const tabsList = [
  { id: 'MARVEL', displayName: 'Marvel' },
  { id: 'FUNNY', displayName: 'Funny' },
  { id: 'ANIMATION', displayName: 'Animation' },
  { id: 'WEB SERIES', displayName: 'Web Series' },
];

class Movies extends Component {
  state = {
    search: 'Marvel',
    moviesList: [],
    isLoading: false, 
  };

  componentDidMount() {
    this.getMovieList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.getMovieList();
    }
  }

  changeSearch = (event) => {
    this.setState({ search: event.target.value });
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.getMovieList();
    }
  };

  changeType = (id) => {
    const selectedTab = tabsList.find((tab) => tab.id === id);
    this.setState({
      search: selectedTab.displayName,
    });
  };

  getMovieList = async () => {
    try {
      this.setState({ isLoading: true }); 
      const { search } = this.state;
      const apiKey = '71d76b30';
      const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();

      if (data.Search) {
        const updatedMovies = data.Search.map((each) => ({
          id: each.imdbID,
          title: each.Title,
          year: each.Year,
          poster: each.Poster,
          imdbRating: each.imdbRating || 'N/A',
          type: each.Type,
        }));
        this.setState({ moviesList: updatedMovies });
      } else {
        this.setState({ moviesList: [] });
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      this.setState({ moviesList: [] });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
  const { search, moviesList, isLoading } = this.state;

  return (
    <div className="bg">
      <h1 className="head">MOVIE LIST</h1>

      <ul className="tabs-container">
        {tabsList.map((each) => (
          <TabItem
            changeType={this.changeType}
            details={each}
            key={each.id}
          />
        ))}
      </ul>

      <div className='center'>
        <div className="search-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/10629/10629681.png"
            alt="search"
            className="search-icon"
          />
          <input
            type="search"
            value={search}
            onChange={this.changeSearch}
            onKeyDown={this.handleKeyPress}
            placeholder="Search here..."
            className="search-input"
          />
          <img
            src="https://www.iconpacks.net/icons/1/free-microphone-icon-342-thumb.png"
            alt="mic"
            className="mic-icon"
          />
        </div>
      </div>

      {isLoading ? (
        <Loader type='tailspin' color= '#ffffff' height = {50} width = {50}/>
      ) : (
        <ul className="movies-container">
          {moviesList.map((each) => (
            <MovieCard details={each} key={each.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
}

export default Movies;