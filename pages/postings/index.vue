<template>
    <div>
        <confirm ref="confirm"></confirm>

        <v-toolbar color="purple" rounded class="mb-5">
            <span class="title white--text">Lançamentos</span>
            <v-spacer></v-spacer>
            <v-btn color="white" icon @click="findAll">
                <v-icon>mdi-reload</v-icon>
            </v-btn>
            <v-btn color="white" icon :to="{name: 'postings-new'}">
                <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
            <v-btn color="white" icon @click="dialog = true">
                <v-icon>mdi-filter</v-icon>
            </v-btn>
        </v-toolbar>

        <v-list  v-for="item in postings" :key="item.id">
            <v-card class="mx-auto" style="max-width: 90vw">
                <v-alert class="pb-0" outlined color="purple darken-2">
                    <v-list-item>

                        <v-list-item-content>
                            <v-list-item-title style="overflow: hidden; white-space:nowrap; width: 10ch; text-overflow: ellipsis;" class="subtitle-2 purple--text text--darken-4">{{ item.name }}</v-list-item-title>
                            <v-list-item-subtitle class="subtitle-2 grey--text text--accent-4">{{ filterData(item.date) }}</v-list-item-subtitle>
                        </v-list-item-content>


                        <v-list-item-icon class="title purple--text text--darken-4">
                            {{ filterMoney(item.value) }}
                        </v-list-item-icon>
                    </v-list-item>

                    <v-divider class="purple mx-4"></v-divider>

                    <v-card-text style="overflow: hidden; white-space:nowrap; width: 80vw; text-overflow: ellipsis;"  class="subtitle-2 purple--text">
                        {{ item.description }}
                    </v-card-text>

                    <v-divider class="purple mx-4"></v-divider>

                    <v-card-actions  >
                        <v-list-item>
                            <v-spacer></v-spacer>
                            <v-btn @click="edit(item)" class="mb-0" color="purple" dark fab small>
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn @click="remove(item)"  class="ml-5" color="purple" dark fab small>
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                            <v-btn  @click="goDetail(item)"  class="ml-5" color="purple" dark fab small>
                                <v-icon>mdi-card-account-details</v-icon>
                            </v-btn>
                        </v-list-item>
                    </v-card-actions>
                </v-alert>
            </v-card>
        </v-list>

        <v-row justify="center">
            <v-dialog v-model="dialog" persistent>
                <v-card>
                    <v-card-title>
                        <span class="text-h5 purple--text">Filtro</span>
                    </v-card-title>
                    <v-card-text>
<!--                        <v-row>-->
<!--                            <v-col cols="12">-->
                                <v-select
                                    dense
                                    clearable
                                    v-model="filter.person_id"
                                    :items="people"
                                    item-value="id"
                                    item-text="name"
                                    label="Pessoas"
                                    outlined
                                ></v-select>
<!--                            </v-col>-->

<!--                            <v-col cols="12">-->
                                <v-select
                                    dense
                                    clearable
                                    v-model="filter.period_id"
                                    :items="periods"
                                    item-value="id"
                                    item-text="name"
                                    label="Periodos"
                                    outlined
                                ></v-select>
<!--                            </v-col>-->

<!--                            <v-col cols="12">-->
                                <span class="v-label">Período livre</span>
                                <v-date-picker locale="pt-br" width="100%" color="purple" no-title v-model="filter.periods" range ></v-date-picker>
<!--                            </v-col>-->
<!--                        </v-row>-->
                    </v-card-text>
                    <v-card-actions>
<!--                        <v-spacer></v-spacer>-->
                        <v-row class="d-flex justify-space-around">
                            <v-btn class="mb-4" color="purple darken-1" dark @click="dialog = false">Fechar</v-btn>
                            <v-btn class="mb-4" color="purple darken-1" dark @click="clearFilter()">Limpar</v-btn>
                            <v-btn class="mb-4" color="purple darken-1" dark @click="applyFilter">Aplicar</v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import Confirm from "~/components/Confirm";
export default {
    components: { Confirm },
    data: () => ({
        postings: [],
        periods: [],
        people: [],
        dialog: false,
        filter: {
            periods: [],
            period_id: '',
            person_id: ''
        },
    }),
    name: "index",
    created() {
        this.$store.commit('setIsVisibleAppBar', true);
        this.$store.commit('setAppBarTitle', '');
    },
    async mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            const postings = this.findAll();
            const people = this.findPeople();
            const periods = this.findPeriods();
            Promise.all([postings, people, periods]).then(() => {
                this.$nuxt.$loading.finish();
            });
        });
    },
    methods: {
        async findAll() {
            if (!this.filter.person_id && !this.filter.period_id  && (!this.filter.periods || !this.filter.periods.length)) {
                this.filter = {};
            }
            this.postings = await this.$axios.$get('/postings', { params: this.filter});
        },
        edit(row) {
            this.$store.commit('postings/setPosting', row);
            this.$router.push({name: 'postings-edit'});
        },
        goDetail(item) {
            this.$router.push({name: 'postings-details', params: item})
        },
        remove(item) {
            this.$refs.confirm.open('Excluir', 'Deseja excluir esse lançamento?').then((confirm) => {
                if (confirm) {
                    this.$nuxt.$loading.start();
                    this.$axios.$delete(`/postings/${item.id}`).then(response => {
                        this.findAll();
                        this.$nuxt.$loading.finish();
                        this.$notifier.showMessage({ content: 'Lançamento excluído com sucesso!', color: 'success' });
                    }).catch(e => {
                        this.$nuxt.$loading.finish();
                        this.$notifier.showMessage({ content: 'Erro ao excluir lançamentos!', color: 'error' });
                    })
                }
            })
        },
        filterMoney(value) {
            return 'R$' + parseFloat(value).toFixed(2).replace('.', ',');
        },
        filterData(value) {
            return value ? value.split('-').reverse().join('/') : '';
        },
        async findPeople() {
            this.people = await this.$axios.$get('/people');
        },
        async findPeriods() {
            this.periods = await this.$axios.$get('/periods');
        },
        clearFilter() {
            this.filter = { periods: [], period_id: '', person_id: '' };
        },
        async applyFilter() {
            await this.findAll(this.filter);
            this.dialog = false;
        }

    }
}
</script>

<style scoped>

</style>
