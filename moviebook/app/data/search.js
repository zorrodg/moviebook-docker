import axios from 'axios';
import { parseString } from 'xml2js';
import moment from 'moment';

function mapMoviesResponse(response) {
    return new Promise((resolve) => {
        resolve(response.data.results.map(movie => {
            return {
                id: String(movie.id),
                type: 'movie',
                title: movie.title,
                image: movie.poster_path && 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path,
                releaseDate: moment(movie.release_date)
            };
        }));
    });
}

function mapBooksResponse(response) {
    return new Promise((resolve, reject) => {
        parseString(response.data, (err, books) => {
            if (err) {
                reject(err);
            }

            function twoDigits(date) {
                if (typeof date === 'string' && date.length < 2) {
                    return '0' + date;
                }

                return date;
            }

            resolve(books.GoodreadsResponse.search[0].results[0].work.map(book => {
                return {
                    id: book.best_book[0].id[0]._,
                    type: 'book',
                    title: book.best_book[0].title[0],
                    image: book.best_book[0].image_url[0],
                    releaseDate: moment(
                        book.original_publication_year[0]._ +
                        '-' + twoDigits(book.original_publication_month[0]._ || '1') +
                        '-' + twoDigits(book.original_publication_day[0]._ || '1')
                    )
                };
            }));
        });
    });
}

export default function search(term) {
    return axios.all([
        axios.get(`/api/movies?query=${term}`),
        axios.get(`/api/books?query=${term}`)
    ]).then(([movies, books]) => {
        return axios.all([
            mapMoviesResponse(movies),
            mapBooksResponse(books)
        ]);
    })
    .then(([movies, books]) => {
        return movies
        .concat(books)
        .filter(item => item.releaseDate.isValid() && !!item.image);
    })
    .catch(err => {
        throw new Error('Problem fetching data:', err);
    });
}
