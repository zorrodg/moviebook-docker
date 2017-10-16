<style lang="stylus">
    .parallax__image {
        bottom auto
        top -200px
    }

    .movie-tagline {
        text-shadow 1px 1px 3px #000
    }

    @media all and (min-width: 600px) {
        .movie-tagline {
            font-size 34px
        }
    }

    @media all and (min-width: 1200px) {
        .parallax__image {
            top -400px
        }
    }
</style>

<template>
    <main>
        <v-toolbar class="secondary" dark>
            <v-btn @click="goBack" icon>
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>{{ movie.title }}</v-toolbar-title>
        </v-toolbar>
        <v-parallax v-if="movie.backdrop" :src="movie.backdrop" height="300" class="black">
            <v-layout v-if="movie.tagline" column align-center justify-center>
                <h2 class="white--text movie-tagline">{{movie.tagline}}</h2>
            </v-layout>
        </v-parallax>
        <v-container>
            <v-layout>
                <v-flex xs6 sm4 md3 lg2>
                    <v-card>
                        <v-card-media :src="movie.image" height="290"></v-card-media>
                    </v-card>
                </v-flex>
                <v-flex xs6 sm8 md9 lg10 class="ml-3">
                    <v-layout wrap>
                        <v-flex>
                            <p class="ma-0">
                                <strong>Original Title: </strong> {{movie.originalTitle}}
                            </p>
                            <p class="ma-0">
                                <strong>Runtime: </strong> {{movie.runtime}} minutes
                            </p>
                            <p>
                                <strong>Release Date: </strong> {{formatDate(movie.releaseDate)}}
                            </p>
                            <v-divider />
                        </v-flex>
                        <v-flex>
                            <p class="mt-3">
                                {{movie.description}}
                            </p>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>

<script>
import getMovie from '~/data/movie';

export default {
    data () {
        return {
            movie: false
        };
    },
    mounted () {
        getMovie(this.id)
        .then(data => {
            this.movie = data
        });
    },
    asyncData ({ params }) {
        return {
            id: params.id
        };
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
