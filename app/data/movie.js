import axios from 'axios';
import moment from 'moment';

function mapMovieResponse(response) {
    return new Promise ((resolve) => {
        const movie = response.data;

        resolve({
            id: String(movie.id),
            type: 'movie',
            title: movie.title,
            backdrop: movie.backdrop_path && 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.backdrop_path,
            image: movie.poster_path && 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path,
            runtime: movie.runtime,
            description: movie.overview,
            originalTitle: movie.original_title,
            tagline: movie.tagline,
            releaseDate: moment(movie.release_date)
        });
    });
}

export default function getMovie(id) {
    return axios.get('/api/movie/' + id)
    .then(mapMovieResponse)
    .catch(err => {
        throw new Error('Problem fetching data:', err);
    });
}
