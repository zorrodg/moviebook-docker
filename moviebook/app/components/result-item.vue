<style lang="stylus">
@media all and (min-width: 480px) and (max-width: 599px) {
    .flex.mb4 {
        flex-basis 33%
        max-width 33%
    }
}

.card {
    cursor pointer
}

.card__title {
    strong {
        white-space nowrap
        overflow-x hidden
        text-overflow ellipsis
    }
}
</style>

<template>
    <v-flex xs6 sm3 md2 lg2 class="mb4">
        <v-card
            @click="gotoDetail(item.type, item.id)"
            class="lighten-3"
            :class="[item.type === 'book' ? 'light-blue' : 'light-green']">
            <v-card-media :src="item.image" height="240px">
            </v-card-media>
            <v-card-title primary-title>
                <strong>
                    {{item.title}}
                </strong>
            </v-card-title>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    props: ['item'],
    methods: {
        gotoDetail (type, id) {
            this.$nuxt.$router.push(type + '/' + id);
        }
    }
}
</script>
