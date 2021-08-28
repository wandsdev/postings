<template>
    <span>
        <v-card >
            <v-alert outlined color="purple darken-2">
            <v-card-title>
                <v-list-item-icon>
                    <v-icon color="purple" size="32">mdi-account-box</v-icon>
                </v-list-item-icon>
                <v-list-item-content >
                    <v-list-item-title class="purple--text title" >{{ posting.person_name }}</v-list-item-title>
                </v-list-item-content>
            </v-card-title>

            <v-divider class="purple mx-4"></v-divider>

            <v-card-text class="title purple--text">
                {{ posting.description }}
            </v-card-text>

            <v-divider class="purple mx-4"></v-divider>

            <v-card-actions  >
                <v-list-item >

                    <v-list-item-content>
                        <v-list-item-title class="purple--text subtitle-2">{{ filterData(posting.date) }}</v-list-item-title>
                    </v-list-item-content>

                    <v-spacer></v-spacer>

                    <v-list-item-content>
                        <v-list-item-title class="purple--text title">{{ filterMoney(posting.value) }}</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
            </v-card-actions>
            </v-alert>
        </v-card>
    </span>
</template>

<script>
export default {
    name: "detail",
    data: () => ({
        posting: {}
    }),
    async created() {
        this.$store.commit('setIsVisibleAppBar', false);
        this.$store.commit('setAppBarTitle', 'Detalhes');
        this.$nuxt.$loading.start();
        this.posting = await this.find(this.$route.params.id);
        this.$nuxt.$loading.finish();
    },
    methods: {
        async find(id) {
            try {
                return await this.$axios.$get(`/postings/${id}`);
            } catch (e) {
                this.$notifier.showMessage({content: 'Erro ao buscar lançamento!', color: 'error'});
            }
        },
        filterMoney(value) {
            return 'R$' + parseFloat(value).toFixed(2).replace('.', ',');
        },
        filterData(value) {
            return value ? value.split('-').reverse().join('/') : '';
        }
    }
}
</script>

<style scoped>

</style>
