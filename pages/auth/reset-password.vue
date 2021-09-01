<template>
    <v-container class="px-4 py-2" style="height: 90vh; max-width: 420px;">
        <v-row class="justify-center mt-6 mb-6">
            <v-img class="" src="/logo2.png"></v-img>
        </v-row>
        <v-row class="justify-center">
            <v-col cols="12" md="12" lg="12" class="px-0 mx-0 py-0">
                <v-form class="">
                    <v-text-field
                        color="purple"
                        prepend-inner-icon="mdi-email"
                        outlined
                        disabled
                        v-model="formData.email"
                        label="Email"
                        :error-messages="errorMessages.email"
                        type="email"
                    ></v-text-field>
                    <v-text-field
                        color="purple"
                        prepend-inner-icon="mdi-pound-box"
                        outlined
                        label="Código de verificação"
                        v-model="formData.validation_code"
                        :error-messages="errorMessages.validation_code"
                        type="text"
                    ></v-text-field>
                    <v-text-field
                        color="purple"
                        prepend-inner-icon="mdi-lock"
                        outlined
                        label="Senha"
                        v-model="formData.password"
                        :error-messages="errorMessages.password"
                        type="password"
                    ></v-text-field>
                    <v-text-field
                        color="purple"
                        prepend-inner-icon="mdi-lock"
                        outlined
                        label="Repetir Senha"
                        v-model="formData.password_confirmation"
                        :error-messages="errorMessages.password_confirmation"
                        type="password"
                    ></v-text-field>
                    <v-btn color="purple" block dark large @click="resetPassword">
                        Atualizar senha
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
        <v-row class="flex-column align-center mt-4">
            <span class="login-link purple--text subtitle-1 text-decoration-underline" @click="forgotPassword">Reenviar código de verificação</span>
            <span class="login-link purple--text subtitle-1 text-decoration-underline mb-10" @click="$router.push({ 'name': 'auth-login'})">Fazer login</span>
        </v-row>
    </v-container>
</template>

<script>
import ErrorHandler from "~/services/ErrorHandler";

export default {
    auth: 'guest',
    name: "reset-password",
    layout: 'clean',
    data: () => ({
        formData: {
            email: '',
            validation_code: '',
            password: '',
            password_confirmation: '',
        },
        user: {},
        errorMessages: {}
    }),
    mounted() {
        if (this.$route.params.user) {
            this.formData.email = this.$route.params.user.email;
        } else {
            this.$router.push({ name: 'auth-forgot-password' });
        }
    },
    methods: {
        async resetPassword() {
            this.$nuxt.$loading.start();
            this.errorMessages = {};
            try {
                await this.$axios.post('/auth/reset_password', this.formData);
                this.$nuxt.$loading.finish();
                await this.$dialog.info({
                    title: 'Info',
                    text: 'Sua senha foi redefinida com sucesso. Você será redirecionado para tela de login.',
                });
                await this.$router.push({ name: 'auth-login'});
            } catch (error) {
                this.$nuxt.$loading.finish();
                const errorMessages = ErrorHandler.getMessagesByFormRequestValidations(error);
                if (errorMessages) {
                    this.errorMessages = errorMessages ?? this.errorMessages;
                } else {
                    const msg = ErrorHandler.getError(error);
                    await this.$dialog.error({
                        title: 'Erro',
                        text: msg,
                    });
                }
            }
        },
        async forgotPassword() {
            try {
                this.errorMessages = {};
                this.$nuxt.$loading.start();
                const data = { email: this.formData.email }
                await this.$axios.post('/auth/forgot_password', data);
                this.$nuxt.$loading.finish();
                await this.$dialog.info({
                    title: 'Info',
                    text: 'Um novo código foi enviado para seu email.',
                });
            } catch (error) {
                this.$nuxt.$loading.finish();
                const errorMessages = ErrorHandler.getMessagesByFormRequestValidations(error);
                if (errorMessages) {
                    this.errorMessages = errorMessages ?? this.errorMessages;
                } else {
                    const msg = ErrorHandler.getError(error);
                    await this.$dialog.error({
                        title: 'Erro',
                        text: msg,
                    });
                }
            }
        }
    }
}
</script>

<style scoped>
.login-link {
    font-size: 1.1rem !important;
    margin-top: 10px;
}

.login-link:hover {
    text-decoration: underline;
    cursor: pointer;
}
</style>
