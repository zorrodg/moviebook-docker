/* eslint-env node */
const querystring = require('querystring');

const config = Object.assign({
    GOODREADS_URL: 'https://www.goodreads.com/search.xml',
    GOODREADS_BY_ID: 'https://www.goodreads.com/book/show/',
    TMDB_URL: 'https://api.themoviedb.org/3/search/movie',
    TMDB_BY_ID: 'https://api.themoviedb.org/3/movie/'
}, process.env);

module.exports = {
    srcDir: 'app',
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
        ]
    },
    plugins: [
        '~/plugins/vuetify.js',
        '~/plugins/localforage.js'
    ],
    css: ['~/assets/main.styl'],
    modules: [
        [
            '@nuxtjs/proxy',
            {
                logLevel: 'silent'
            }
        ]
    ],
    proxy: {
        '/api/books': {
            target: config.GOODREADS_URL,
            pathRewrite: {
                '^/api/books(.*)$': path => {
                    path = path.replace(/\/?(.*)\?/, '');
                    const { query = '' } = querystring.parse(path);

                    return `?key=${config.GOODREADS_KEY}&q=${query}`;
                }
            }
        },
        '/api/book': {
            target: config.GOODREADS_BY_ID,
            pathRewrite: {
                '^/api/book/(.*)$': `$1?key=${config.GOODREADS_KEY}`
            }
        },
        '/api/movies': {
            target: config.TMDB_URL,
            pathRewrite: {
                '^/api/movies(.*)$': path => {
                    path = path.replace(/\/?(.*)\?/, '');
                    const { query = '' } = querystring.parse(path);

                    return `?api_key=${config.TMDB_KEY}&query=${query}`;
                }
            }
        },
        '/api/movie': {
            target: config.TMDB_BY_ID,
            pathRewrite: {
                '^/api/movie/(.*)$': `$1?api_key=${config.TMDB_KEY}`
            }
        },
    }
};
