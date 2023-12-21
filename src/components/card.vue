<template>
    <li class="card">
        <div class="card_img">
            <a href="product.html">
                <img 
                    :src="card.logo" 
                    :alt="card.title">
            </a>
        </div>
        <div class="card_info">
            <p class="card_title_album_name">
                {{ card.title.toUpperCase() }}<br>
                <span>{{ card.artist.title.toUpperCase() }}</span>
            </p>
            <p class="price">
                {{ (String(card.price)).toLocaleString('ru-RU') }}
            </p>
            <div class="card_operation">
                <a href="#" class="card_button">КУПИТЬ</a>
                <div class="quantity_operation">
                    <a href="#" class="minus">-</a>
                    <p class="number">1</p>
                    <a href="#" class="plus">+</a>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        props: {
            card: {
                type: Object,
                required: true,
            },
        },
    }
</script>

<style scoped>

</style>