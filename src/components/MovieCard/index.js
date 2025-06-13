import './index.css'
import { useState } from 'react';

const  MovieCard = props => {
    const {details} = props
    const {title,year,poster,imdbRating,type} = details
    const [isFavorite, setIsFavorite] = useState(false);
    const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
    return (
    <li className='movie-item'>
        <img src={poster} alt='movie-poster'/>
        <div className='movie-details'>
            <div className='movie-info'>
                <h1 className='movie-title'>{title}</h1>
                <p className='type'>Type: {type} </p>
                <p className='para'>{year}</p>
                <p className='para'>{imdbRating}</p>
            </div>
            <img src={
            isFavorite
              ? 'https://images.emojiterra.com/google/noto-emoji/unicode-16.0/bw/512px/1f90d.png'
              : 'https://images.emojiterra.com/google/noto-emoji/unicode-16.0/bw/512px/1f90e.png'
          } alt = 'favourite'
            className="favourite-icon"
            onClick={toggleFavorite}/>
        </div>
    </li>
    );
}

export default MovieCard;