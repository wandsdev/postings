<template>
    <v-container class="px-4 py-2" style="height: 90vh; max-width: 420px;">
        <v-row class="justify-center mt-6 mb-6">
            <v-img class="" src="/logo2.png"></v-img>
        </v-row>

        <v-row style="text-align: center" class="pb-5">
            <div style="font-family: 'Roboto', sans-serif !important;" class="black--text text--accent-1">Foi enviando um email com um código para validar sua conta. Copie esse código e cole no campo abaixo</div>
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
                    <v-btn color="purple" block dark large @click="send">
                        Enviar
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
        <v-row class="flex-column align-content-center mt-5">
            <span @click="resendValidationCode" class="login-link purple--text subtitle-1 text-decoration-underline">Reenviar código de verificação</span>
        </v-row>

    </v-container>
</template>

<script>
import ErrorHandler from "~/services/ErrorHandler";

export default {
    auth: 'guest',
    name: "account-validation",
    layout: 'clean',
    data: () => ({
        formData: {
            email: '',
            validation_code: ''
        },
        user: {},
        errorMessages: {}
    }),
    mounted() {
        if (this.$route.params.user) {
            this.user = this.$route.params.user;
            this.formData.email = this.user.email;
        } else {
            this.$router.push({ name: 'auth-register' });
        }
    },
    methods: {
        async send() {
            try {
                this.$nuxt.$loading.start();
                this.errorMessages = {};
                const data = { ...this.formData }
                await this.$axios.post('/auth/account_validation', data);
                this.$nuxt.$loading.finish();
                await this.$dialog.info({
                    title: 'Info',
                    text: 'Conta verificada com sucesso. Você será redirecionado para tela de login.',
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
        async resendValidationCode() {
            try {
                this.$nuxt.$loading.start();
                const data = { email: this.formData.email }
                await this.$axios.post('/auth/resend_validation_code', data);
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
