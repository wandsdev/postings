<template>
    <div class="mt-3">
        <v-form ref="formEditPeriods" v-model="valid">
            <v-text-field
                v-model="formData.name"
                outlined
                :rules="nomeRules"
                label="Nome"
                required
            ></v-text-field>
            <v-text-field :rules="startDateRules" required v-model="formData.start_date" outlined type="date" label="Data de início"></v-text-field>
            <v-text-field :rules="endDateRules" required v-model="formData.end_date" outlined type="date" label="Data do fim"></v-text-field>

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
            name: '',
            start_date: '',
            end_date: '',
        },
        errors: {},
        valid: true,
        nomeRules: [
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
        async update() {
            if (this.$refs.formEditPeriods.validate()) {
                this.$nuxt.$loading.start();
                try {
                    await this.$axios.$put(`/periods/${this.formData.id}`, this.formData);
                    this.$nuxt.$loading.finish();
                    this.reset();
                    this.$notifier.showMessage({ content: 'Período editada com sucesso!', color: 'success' });
                    this.$router.push({name: 'periods'});
                } catch (e) {
                    this.$nuxt.$loading.finish();
                    this.$notifier.showMessage({ content: 'Erro ao editar período!', color: 'error' });
                }
            }
        },
        cancel() {
            this.reset();
        },
        reset () {
            this.$refs.formEditPeriods.resetValidation();
            this.$refs.formEditPeriods.reset();
        }
    },
    created() {
        this.$store.commit('setIsVisibleAppBar', false);
        this.$store.commit('setAppBarTitle', 'Editar Período');
    },
    mounted() {
        if (!this.$route.params.id) {
            this.$router.push({name: 'periods'});
        }
        this.formData = this.$route.params;
    }
};
</script>

<style lang="scss" scoped></style>
