<template>
    <div class="mt-3">
        <v-form ref="formEdit" v-model="valid">
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
                :rules="valorRules"
                :error-messages="errors.rate"
                v-model="formData.value"/>

            <v-text-field v-model="formData.date" outlined type="date" label="Data"></v-text-field>

            <v-textarea
                label="Descrição"
                outlined
                :rules="descricaoRules"
                v-model="formData.description"
            ></v-textarea>

            <v-btn class="mb-2" dark block color="purple" @click="update()">Editar</v-btn>
            <v-btn outlined dark block color="purple" @click="cancel()">Cancelar</v-btn>

        </v-form>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import LocalStorage from "../../services/LocalStorage";

export default {
    data: () => ({
        peoples: [],
        formData: {
            id: '',
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
        valorRules: [
            v => !!v || 'O campo valor é obrigatório',
            v => (v !== '0,00') || 'Preencha um valor válido'
        ],
        descricaoRules: [
            v => !!v || 'O campo descrição é obrigatório',
        ],
    }),
    methods: {
        async update() {
            if (this.$refs.formEdit.validate()) {
                this.$nuxt.$loading.start();
                try {
                    await this.$axios.$put(`/postings/${this.formData.id}`, this.formData);
                    this.$nuxt.$loading.finish();
                    this.reset();
                    this.$notifier.showMessage({ content: 'Lançamento editado com sucesso!', color: 'success' });
                    this.$store.commit('postings/setPosting', {});
                    this.$router.push({name: 'postings'});
                } catch (e) {
                    this.$nuxt.$loading.finish();
                    this.$notifier.showMessage({ content: 'Erro ao editar lançamento!', color: 'error' });
                }
            }
        },
        cancel() {
            this.reset();
        },
        reset () {
            this.$refs.formEdit.resetValidation();
            this.$refs.formEdit.reset();
        },
        async findPeople() {
            this.peoples = await this.$axios.$get('/people');
        }
    },
    created() {
        this.$store.commit('setIsVisibleAppBar', false);
        this.$store.commit('setAppBarTitle', 'Editar Lnaçamento');
        this.findPeople();
    },
    mounted() {
        const data = this.$store.getters['postings/getPosting'];
        this.formData = JSON.parse(JSON.stringify(data));
    }
};
</script>

<style lang="scss" scoped></style>
