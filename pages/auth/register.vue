<template>
    <v-container class="px-4 py-2" style="height: 90vh; max-width: 420px;">
        <v-row class="justify-center mt-6 mb-6">
            <v-img class="" src="/logo2.png"></v-img>
        </v-row>

        <v-row class="justify-center">
            <v-col cols="12" md="12" lg="12" class="px-0 mx-0 py-0">
                <v-form ref="formAuthRegister" v-model="valid">
                    <v-text-field
                        color="purple"
                        prepend-inner-icon="mdi-account"
                        outlined
                        v-model="formData.name"
                        label="Nome"
                        :error-messages="errorMessages.name"
                        type="text"
                    ></v-text-field>

                    <v-text-field
                        color="purple"
                        prepend-inner-icon="mdi-email"
                        outlined
                        v-model="formData.email"
                        label="Email"
                        :error-messages="errorMessages.email"
                        type="email"
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
                    <v-btn color="purple" block dark large @click="register">
                        Registrar
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
        <v-row class="justify-space-between mt-3">
            <span class="login-link subtitle-1">
                Ainda não tem conta?
                <span @click="$router.push({name: 'auth-login'})" class="login-link purple--text subtitle-1 text-decoration-underline">Faça login</span>
            </span>
            <span class="login-link purple--text subtitle-1"></span>
        </v-row>
    </v-container>
</template>

<script>
import ErrorHandler from "@/services/ErrorHandler";

export default {
    auth: 'guest',
    name: "register",
    layout: 'clean',
    data: () => ({
        formData: {
            name: 'teste',
            email: 'teste@oi.com',
            password: '12345678',
            password_confirmation: '12345678'
        },
        valid: true,
        errorMessages: {},
    }),

    methods: {
        async register() {
            this.$nuxt.$loading.start();
            this.errorMessages = {};
            try {
                const { data: { user } } = await this.$axios.post('/auth/register', this.formData);
                this.$nuxt.$loading.finish();
                await this.$router.push({ name: 'auth-account-validation',  params: { user } });
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
