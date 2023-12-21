<template>
    <ul class="card_list">
        <card 
            v-for="card, index in cards"
            :card="card"
            :key="index"
            />
    </ul>
</template>

<script>
    import card from '@/components/card.vue';

    export default {
        components: {
            card,
        },
        props: {
            cards: {
                type: Array,
                required: true,
            },
        },    
    }
</script>

<style scoped>

</style>