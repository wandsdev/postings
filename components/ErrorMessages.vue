<template>
    <v-alert
        dismissible
        type="error"
        text
        outlined
        color="red"
        class="mb-10"
    >
        <ul v-for="(msg, index) in errors" :key="index">
            <li>{{ msg }}</li>
        </ul>
    </v-alert>
</template>

<script>
export default {
    name: "ErrorMessages",
    props: {
        errors: {
           type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
