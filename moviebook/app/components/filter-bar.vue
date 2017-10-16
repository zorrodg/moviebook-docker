<template>
    <div>
        <v-menu>
            <v-btn primary slot="activator">Filter</v-btn>
            <v-list>
                <v-list-tile
                    v-for="type in filters"
                    :key="type.name"
                    @click="setFilter(type.name)"
                    :class="{ accent: filter === type.name }">
                    {{ type.label }}
                </v-list-tile>
            </v-list>
        </v-menu>
        <v-menu>
            <v-btn primary slot="activator">Sort by</v-btn>
            <v-list>
                <v-list-tile
                    v-for="type in sortTypes"
                    :key="type.name"
                    @click="setSortType(type.name)"
                    :class="{ accent: sortType === type.name }">
                    {{ type.label }}
                </v-list-tile>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
export default {
    props: ['filter', 'sortType'],
    data () {
        return {
            filters: [
                { name: 'movie', label: 'Movies' },
                { name: 'book', label: 'Books' }
            ],
            sortTypes: [
                { name: 'releaseDate', label: 'Release Date (Newest First)' },
                { name: 'releaseDateDesc', label: 'Release Date (Oldest First)' },
                { name: 'titleAZ', label: 'Title A-Z' },
                { name: 'titleZA', label: 'Title Z-A' }
            ]
        }
    },
    methods: {
        setFilter (type) {
            this.$emit('setFilter', type);
        },
        setSortType (type) {
            this.$emit('setSortType', type);
        }
    }
}
</script>

