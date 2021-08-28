<template>
    <h1>Detalhes</h1>
</template>

<script>
export default {
    name: "detail",
    created() {
        this.$store.commit('setIsVisibleAppBar', false);
        this.$store.commit('setAppBarTitle', 'Detalhes');
    },
}
</script>

<style scoped>

</style>
