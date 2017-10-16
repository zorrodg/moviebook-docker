<style lang="stylus" scoped>
    @media all and (min-width: 600px) {
        .flex.book-cover {
            max-width: 220px;
        }
    }
</style>

<template>
    <main>
        <v-toolbar class="secondary" dark>
            <v-btn @click="goBack" icon>
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>{{ book.title }}</v-toolbar-title>
        </v-toolbar>
        <v-container>
            <v-layout wrap>
                <v-flex xs4 class="book-cover">
                    <v-card>
                        <v-card-media :src="book.image" :height="bookSize"></v-card-media>
                    </v-card>
                </v-flex>
                <v-flex xs6 class="ml-3">
                    <p class="ma-0"><strong>ISBN:</strong> {{book.isbn}}</p>
                    <p class="ma-0"><strong>Release Date:</strong> {{formatDate(book.releaseDate)}}</p>
                    <p><strong>Pages:</strong> {{book.numPages}}</p>
                    <v-divider></v-divider>
                    <div>
                        <h4>Authors</h4>
                        <v-layout>
                            <v-flex xs4 sm2 v-for="author in book.authors" :key="author.name">
                                <v-card>
                                    <v-card-media :src="author.pic" height="100"></v-card-media>
                                    <v-card-title class="hidden-sm-and-down">
                                        <small>{{author.name}}</small>
                                    </v-card-title>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </div>
                </v-flex>
                <v-flex class="mt-4" xs12>
                    <p v-html="book.description"></p>
                </v-flex>
            </v-layout>

        </v-container>

    </main>
</template>

<script>
import getBook from '~/data/book';

export default {
    data () {
        return {
            book: false
        };
    },
    mounted () {
        if (!this.id) {
            return this.$nuxt.$router.push('/');
        }

        getBook(this.id)
        .then(data => {
            console.log(data);
            this.book = data
        });
    },
    asyncData ({ params }) {
        return {
            id: params.id
        };
    },
    computed: {
        bookSize () {
            if (typeof window !== 'undefined') {
                if (window.innerWidth > 600) {
                    return '285';
                }
            }

            return '235';
        }
    },
    methods: {
        goBack () {
            this.$nuxt.$router.push('/');
        },
        formatDate (date) {
            if (!date || !date.isValid()) {
                return;
            }

            return date.format('MM/DD/YYYY');
        }
    }
}
</script>
