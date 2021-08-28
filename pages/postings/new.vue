<template>
    <div class="mt-3">
        <v-form ref="form" v-model="valid">
            <v-select
                v-model="formData.person_id"
                :items="peoples"
                item-value="id"
                item-text="name"
                :rules="nameRules"
                label="Pessoa"
                outlined
                required
            ></v-select>

            <v-currency-field
                label="Valor"
                prefix="R$"
                outlined
                :rules="valueRules"
                :error-messages="errors.rate"
                v-model="formData.value"/>

            <v-textarea
                label="Descrição"
                outlined
                :rules="descriptionRules"
                v-model="formData.description"
            ></v-textarea>

            <v-text-field v-model="formData.date" outlined type="date" label="Data"></v-text-field>

            <v-btn class="mb-2" dark block color="purple" @click="save()">Salvar</v-btn>
            <v-btn outlined dark block color="purple" @click="cancel()">Cancelar</v-btn>

        </v-form>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
    data: () => ({
        peoples: [],
        formData: {
            person_id: '',
            value: '',
            date: '',
            description: '',
        },
        errors: {},
        valid: true,
        nameRules: [
            v => !!v || 'O campo nome é obrigatório',
        ],
        valueRules: [
            v => !!v || 'O campo valor é obrigatório',
            v => (v !== '0,00') || 'Preencha um valor válido'
        ],
        descriptionRules: [
            v => !!v || 'O campo descrição é obrigatório',
        ],
    }),
    methods: {
        async save() {
            if (this.$refs.form.validate()) {
                this.$nuxt.$loading.start();
                try {
                    await this.$axios.$post('/postings', this.formData);
                    this.$nuxt.$loading.finish();
                    this.reset();
                    this.$notifier.showMessage({ content: 'Lançamento salvo com sucesso!', color: 'success' });
                } catch (e) {
                    this.$nuxt.$loading.finish();
                    this.$notifier.showMessage({ content: 'Erro ao salvar lançamento!', color: 'error' });
                }

            }
        },
        cancel() {
            this.reset();
        },
        reset () {
            this.$refs.form.resetValidation();
            this.$refs.form.reset();
        },
        async findPeople() {
            this.peoples = await this.$axios.$get('/people');
        }
    },
    created() {
        this.$store.commit('setIsVisibleAppBar', false);
        this.$store.commit('setAppBarTitle', 'Novo Lnaçamento');
        this.findPeople();
    }
};
import LocalStorage from "../../services/LocalStorage";
</script>

<style lang="scss" scoped></style>
