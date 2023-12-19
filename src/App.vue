<template>
    <my-header />
    <router-view />
    <my-footer />
</template>

<script>
import myHeader from '@/components/header.vue';
import myFooter from '@/components/footer.vue';

export default {
    components: {
        myHeader,
        myFooter,
    }
}
</script>

<style></style>
