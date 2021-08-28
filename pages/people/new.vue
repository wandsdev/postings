<template>
    <div class="mt-3">
        <v-form ref="formAddPeople" v-model="valid">
            <v-text-field
                v-model="formData.name"
                outlined
                :rules="nameRules"
                label="Nome"
                required
            ></v-text-field>

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
        },
        errors: {},
        valid: true,
        nameRules: [
            v => !!v || 'O campo nome é obrigatório',
        ]
    }),
    methods: {
        async save() {
            this.$nuxt.$loading.start();
            if (this.$refs.formAddPeople.validate()) {
                try {
                    await this.$axios.$post('/people', this.formData);
                    this.$nuxt.$loading.finish();
                    this.reset();
                    this.$notifier.showMessage({ content: 'Pessoa salvo com sucesso!', color: 'success' });
                } catch (e) {
                    this.$nuxt.$loading.finish();
                    this.$notifier.showMessage({ content: 'Erro ao salvar pessoa!', color: 'error' });
                }
            }
        },
        cancel() {
            this.reset();
        },
        reset () {
            this.$refs.formAddPeople.resetValidation();
            this.$refs.formAddPeople.reset();
        }
    },
    created() {
        this.$store.commit('setIsVisibleAppBar', false);
        this.$store.commit('setAppBarTitle', 'Nova Pessoa');
    },
};
</script>

<style lang="scss" scoped></style>
