<template>
    <div>
        <confirm ref="confirm"></confirm>
        <v-toolbar color="purple" rounded class="mb-5">
            <span class="title white--text">Períodos</span>
            <v-spacer></v-spacer>
            <v-btn color="white" icon @click="findAll">
                <v-icon>mdi-reload</v-icon>
            </v-btn>
            <v-btn color="white" icon :to="{name: 'periods-new'}">
                <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
        </v-toolbar>

        <v-card class="mx-auto" >
            <v-list v-for="item in people" :key="item.id">
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon color="purple" size="32">mdi-account-box</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title class="title purple--text text--darken-4" v-text="item.name"></v-list-item-title>
                        <v-list-item-subtitle class="subtitle-2 grey--text text--accent-4">{{ filterData(item.start_date) + ' - ' + filterData(item.end_date) }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <v-icon color="purple" @click="goEdit(item)">mdi-pencil</v-icon>
                    </v-list-item-icon>

                    <v-list-item-icon>
                        <v-icon color="purple" @click="remove(item)">mdi-delete</v-icon>
                    </v-list-item-icon>
                </v-list-item>

                <v-divider></v-divider>
            </v-list>
        </v-card>


    </div>
</template>

<script>
export default {
    name: "index",
    data: () => ({
        people: [],
        dialog: false,
        valid: false,
        formData: {
            name: '',
            start_date: '',
            end_date: '',
        }
    }),
    created() {
        this.$store.commit('setIsVisibleAppBar', true);
        this.$store.commit('setAppBarTitle', '');
    },
    async mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            this.findAll().then(() => {
                this.$nuxt.$loading.finish();
            });
        });
    },
    methods: {
        async findAll() {
            try {
                this.people = await this.$axios.$get('/periods');
            } catch (e) {
                this.$notifier.showMessage({ content: 'Erro ao buscar períodos!', color: 'error' });
            }
        },
        goEdit(item) {
            this.$router.push({name: 'periods-edit', params: item});
        },
        remove(item) {
            this.$refs.confirm.open('Excluir', 'Deseja excluir esse período?').then((confirm) => {
                if (confirm) {
                    this.$nuxt.$loading.start();
                    this.$axios.$delete(`/periods/${item.id}`).then(response => {
                        this.findAll();
                        this.$nuxt.$loading.finish();
                        this.$notifier.showMessage({ content: 'Período excluído com sucesso!', color: 'success' });
                    }).catch(e => {
                        this.$nuxt.$loading.finish();
                        console.log(e);
                        this.$notifier.showMessage({ content: 'Erro ao excluir período!', color: 'error' });
                    })
                }
            })
        },
        filterData(value) {
            return value ? value.split('-').reverse().join('/') : '';
        },
    }
}
</script>

<style scoped>

</style>
