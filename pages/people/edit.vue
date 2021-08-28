<template>
    <div class="mt-3">
        <v-form ref="formEditPeople" v-model="valid">
            <v-text-field
                v-model="formData.name"
                outlined
                :rules="nomeRules"
                label="Nome"
                required
            ></v-text-field>

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
        formData: {
            id: '',
            name: ''
        },
        errors: {},
        valid: true,
        nomeRules: [
            v => !!v || 'O campo nome é obrigatório',
        ]
    }),
    methods: {
        async update() {
            if (this.$refs.formEditPeople.validate()) {
                this.$nuxt.$loading.finish();
                try {
                    await this.$axios.$put(`/people/${this.formData.id}`, this.formData);
                    this.$nuxt.$loading.start();
                    this.reset();
                    this.$notifier.showMessage({ content: 'Pessoa editada com sucesso!', color: 'success' });
                    this.$router.push({name: 'people'});
                } catch (e) {
                    this.$nuxt.$loading.finish();
                    this.$notifier.showMessage({ content: 'Erro ao editar pessoa!', color: 'error' });
                }
            }
        },
        cancel() {
            this.reset();
        },
        reset () {
            this.$refs.formEditPeople.resetValidation();
            this.$refs.formEditPeople.reset();
        }
    },
    created() {
        this.$store.commit('setIsVisibleAppBar', false);
        this.$store.commit('setAppBarTitle', 'Editar Pessoa');
    },
    mounted() {
        if (!this.$route.params.id) {
            this.$router.push({name: 'people'});
        }
        this.formData = this.$route.params;
    }
};
</script>

<style lang="scss" scoped></style>
