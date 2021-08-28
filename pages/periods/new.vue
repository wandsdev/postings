<template>
    <div class="mt-3">
        <v-form ref="formAddPeriod" v-model="valid">
            <v-text-field
                v-model="formData.name"
                outlined
                :rules="nameRules"
                label="Nome"
                required
            ></v-text-field>
            <v-text-field :rules="startDateRules" required v-model="formData.start_date" outlined type="date" label="Data de início"></v-text-field>
            <v-text-field :rules="endDateRules" required v-model="formData.end_date" outlined type="date" label="Data do fim"></v-text-field>

            <v-btn class="mb-2" dark block color="purple" @click="save()">Salvar</v-btn>
            <v-btn outlined dark block color="purple" @click="cancel()">Cancelar</v-btn>

        </v-form>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import LocalStorage from "../../services/LocalStorage";
export default {
    data: () => ({
        formData: {
            name: '',
            start_date: '',
            end_date: '',
        },
        errors: {},
        valid: true,
        nameRules: [
            v => !!v || 'O campo nome é obrigatório',
        ],
        startDateRules: [
            v => !!v || 'O campo Data de início é obrigatório',
        ],
        endDateRules: [
            v => !!v || 'O campo Data do fim é obrigatório',
        ]
    }),
    methods: {
        async save() {
            if (this.$refs.formAddPeriod.validate()) {
                this.$nuxt.$loading.start();
                try {
                    await this.$axios.$post('/periods', this.formData);
                    this.$nuxt.$loading.finish();
                    this.reset();
                    this.$notifier.showMessage({ content: 'Período salvo com sucesso!', color: 'success' });
                } catch (e) {
                    this.$nuxt.$loading.finish();
                    this.$notifier.showMessage({ content: 'Erro ao salvar período!', color: 'error' });
                }
            }
        },
        cancel() {
            this.reset();
        },
        reset () {
            this.$refs.formAddPeriod.resetValidation();
            this.$refs.formAddPeriod.reset();
        }
    },
    created() {
        this.$store.commit('setIsVisibleAppBar', false);
        this.$store.commit('setAppBarTitle', 'Novo Período');
    },
};
</script>

<style lang="scss" scoped></style>
