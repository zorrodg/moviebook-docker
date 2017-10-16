<style lang="stylus">
@import '~assets/theme.styl'

.progress-circular {
    position absolute
    top 1vh
    right 2vw
}

@media all and (min-width: 600px) {
    .progress-circular {
        top 3vh
        right 1vw
    }
}

</style>

<template>
    <main>
        <search-toolbar v-on:search="doSearch" />

        <v-container grid-list-md>
            <div v-if="filtered.length">
                <filter-bar
                    :filter="filter"
                    :sortType="sortType"
                    v-on:setFilter="setFilter"
                    v-on:setSortType="setSortType"
                    />
                <v-layout wrap>
                    <result-item
                        v-for="item in filtered"
                        :item="item"
                        :key="item.id" />
                </v-layout>
            </div>

            <v-progress-circular
                v-else-if="loading"
                indeterminate
                class="primary--text" />

            <div v-else-if="error">
                <filter-bar :filter="filter" :sortType="sortType" />
                <p class="error--text">No results</p>
            </div>

            <div v-else>
                <h1 class="primary--text">MovieBook</h1>
                <p>Search for books and movies using the search bar at the top. Clear the search bar to come back to this screen at any time.</p>
                <p>Your recent searches will be displayed below as you use the app.</p>
                <div v-if="displayedSearches.length">
                    <v-subheader>Recent searches:</v-subheader>
                    <v-list>
                        <v-list-tile
                            v-for="(search, index) in displayedSearches"
                            :key="index"
                            @click="doOrClearSearch($event, search)">
                            <v-btn icon>
                                <v-icon class="grey--text lighten-3">close</v-icon>
                            </v-btn>
                            {{search}}
                        </v-list-tile>
                    </v-list>
                </div>
            </div>
        </v-container>
    </main>
</template>

<script>
import SearchToolbar from '~/components/search-toolbar.vue';
import ResultItem from '~/components/result-item.vue';
import FilterBar from '~/components/filter-bar.vue';
import search from '~/data/search';
import moment from 'moment';

const SORT_TYPES = {
    releaseDate: (a, b) => moment(a.releaseDate).isSameOrBefore(moment(b.releaseDate), 'year') ? 1 : -1,
    releaseDateDesc: (a, b) => moment(a.releaseDate).isSameOrBefore(moment(b.releaseDate), 'year') ?-1 : 1,
    titleAZ: (a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1,
    titleZA: (a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1
};

export default {
    components: {
        SearchToolbar,
        ResultItem,
        FilterBar
    },

    head () {
        return {
            title: 'MovieBook'
        };
    },

    methods: {
        doSearch (evt, term) {
            this.filter = false;
            this.sortType = 'releaseDate';

            if (!term) {
                this.results = [];
                this.$setItem('lastResults', []);
                this.error = false;
                return;
            }

            this.loading = true;
            this.error = false;
            search(term)
            .then(results => {
                this.loading = false;
                this.results = results;
                this.$setItem('lastResults', results);
                this.$getItem('searches')
                .then(searches => {
                    if (searches[searches.length - 1] !== term) {
                        this.searches.push(term);
                        this.$setItem('searches', this.searches);
                    }
                });
            })
            .catch(err => {
                this.loading = false;
                this.results = [];
                this.error = true;
                console.error(err);
            });
        },

        doOrClearSearch (evt, term) {
            if (!Array.from(evt.target.classList).includes('btn__content')) {
                return this.doSearch(evt, term);
            }

            this.searches.splice(this.searches.lastIndexOf(term), 1);

            this.$setItem('searches', this.searches);
        },

        setSortType (type) {
            this.sortType = type;
        },
        setFilter (type) {
            if (this.filter === type) {
                return this.filter = false;
            }

            this.filter = type;
        }
    },

    computed: {
        filtered () {
            if (this.loading) {
                return [];
            }

            const results = this.results.filter(item => {
                if (!this.filter) {
                    return true;
                }

                return item.type === this.filter;
            })
            .sort(SORT_TYPES[this.sortType]);

            if (results.length) {
                this.error = false;
                return results;
            }

            if (this.filter) {
                this.error = true;
            }

            return [];
        },
        displayedSearches () {
            return this.searches.slice().reverse().slice(0, 10);
        }
    },

    data () {
        return {
            results: [],
            searches: [],
            loading: false,
            filter: false,
            sortType: 'releaseDate',
            error: false
        }
    },

    mounted () {
        this.$getItem('searches').then(searches => {
            this.searches = searches || [];
        });

        this.$getItem('lastResults').then(results => {
            this.results = results || [];
        });
    }
}
</script>
