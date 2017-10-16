import axios from 'axios';
import { parseString } from 'xml2js';
import moment from 'moment';

function mapBookResponse(response) {
    return new Promise ((resolve, reject) => {
        parseString(response.data, (err, data) => {
            if (err) {
                return reject(err);
            }

            function twoDigits(date) {
                if (typeof date === 'string' && date.length < 2) {
                    return '0' + date;
                }

                return date;
            }

            const book = data.GoodreadsResponse.book[0];

            resolve({
                id: book.id[0],
                title: book.title[0],
                isbn: book.isbn[0],
                description: book.description[0],
                numPages: book.num_pages[0],
                image: book.image_url[0],
                releaseDate: moment(
                    book.publication_year[0] +
                    '-' + twoDigits(book.publication_month[0]) +
                    '-' + twoDigits(book.publication_day[0])
                ),
                authors: book.authors.map(a => ({
                    name: a.author[0].name[0],
                    pic: a.author[0].image_url[0]._
                }))
            });
        });
    });
}

export default function getBook(id) {
    return axios.get('/api/book/' + id)
    .then(mapBookResponse)
    .catch(err => {
        throw new Error('Problem fetching data:', err.stack);
    });
}
