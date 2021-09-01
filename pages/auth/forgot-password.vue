<template>
    <v-container class="px-4 py-2" style="height: 90vh; max-width: 420px;">
        <v-row class="justify-center mt-6 mb-6">
            <v-img class="" src="/logo2.png"></v-img>
        </v-row>
        <v-row class="justify-center pb-2">
            <div class="text-h5 font-weight-bold purple--text">Esqueceu sua senha?</div>
        </v-row>
        <v-row style="text-align: center" class="pb-5">
            <div style="font-family: Roboto, sans-serif;" class="">Digite seu endereço de e-mail e enviaremos instruções sobre como redefinir sua senha</div>
        </v-row>
        <v-row class="justify-center">
            <v-col cols="12" md="12" lg="12" class="px-0 mx-0 py-0">
                <v-form class="">
                        <v-text-field
                            color="purple"
                            prepend-inner-icon="mdi-email"
                            outlined
                            name="login"
                            label="Email"
                            type="text"
                            v-model="formData.email"
                            :error-messages="errorMessages.email"
                        ></v-text-field>
                        <v-btn color="purple" block dark large @click="forgotPassword">
                            Enviar
                        </v-btn>
                </v-form>
            </v-col>
        </v-row>
        <v-row class="justify-space-between mt-2">
            <span class="login-link purple--text subtitle-1" @click="$router.push({ name: 'auth-login'})">Fazer login</span>
            <span class="login-link purple--text subtitle-1" @click="$router.push({ name: 'auth-register'})">Registre-se</span>
        </v-row>

    </v-container>
</template>

<script>
import ErrorHandler from "~/services/ErrorHandler";

export default {
    auth: 'guest',
    name: "forgot-password",
    layout: 'clean',
    data: () => ({
        formData: {
            email: 'teste@oi.com'
        },
        errorMessages: {}
    }),
    methods: {
        async forgotPassword() {
            try {
                this.errorMessages = {};
                this.$nuxt.$loading.start();
                const data = { email: this.formData.email }
                await this.$axios.post('/auth/forgot_password', data);
                this.$nuxt.$loading.finish();
                const user = { email: this.formData.email };
                await this.$router.push({ name: 'auth-reset-password', params: { user } });
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
