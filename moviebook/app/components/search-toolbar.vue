<style lang="stylus">
@import '~assets/theme.styl'

.input-group.input-group--focused .input-group__prepend-icon {
    color: $red.base
}
.input-group--text-field input {
    caret-color: $red.base;
}
</style>

<template>
    <v-toolbar class="secondary" dark>
        <v-toolbar-title>MovieBook</v-toolbar-title>
        <v-text-field dark
            prepend-icon="search"
            full-width
            hide-details
            v-model="searchTerm"
            @keyup="search($event)"
        ></v-text-field>
    </v-toolbar>
</template>

<script>
import debounce from "lodash.debounce";

export default {
    data () {
        return {
            searchTerm: ''
        }
    },
    methods: {
        search: debounce(function (evt) {
            this.$emit('search', evt, this.searchTerm);
        }, 300)
    }
}
</script>
