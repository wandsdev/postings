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
                            v-model="formData.email"
                            outlined
                            name="login"
                            label="Email"
                            :error-messages="errorMessages.email"
                            type="text"
                        ></v-text-field>
                        <v-text-field
                            color="purple"
                            prepend-inner-icon="mdi-lock"
                            v-model="formData.password"
                            :error-messages="errorMessages.password"
                            outlined
                            label="Senha"
                            type="password"
                        ></v-text-field>
                        <v-btn color="purple" block dark large @click="login">
                            Entrar
                        </v-btn>
                </v-form>
            </v-col>
        </v-row>
        <v-row class="justify-space-between mt-2">
            <span class="login-link purple--text subtitle-1" @click="$router.push({ name: 'auth-forgot-password'})">Esqueceu a senha?</span>
<!--            <v-btn class="mt-2 text-none" text rounded dark color="purple">Esqueceu a senha?</v-btn>-->
<!--            <v-btn class="mt-2 text-none" text rounded dark color="purple">Registre-se</v-btn>-->
            <span class="login-link purple--text subtitle-1" @click="$router.push({ name: 'auth-register'})">Registre-se</span>
        </v-row>
    </v-container>
</template>

<script>
import ErrorHandler from "~/services/ErrorHandler";

export default {
    name: "login",
    layout: 'clean',
    auth: 'guest',
    data: () => ({
        formData: {
            email: '',
            password: ''
        },
        errorMessages: {}
    }),
    async mounted() {
        const response = await this.$axios.$get('https://jsonplaceholder.typicode.com/todos/1');
        const msg = `id => ${response.id}, Titulo => ${response.title} `;
        this.$dialog.info({
            title: 'Informação',
            text: msg,
        });
        console.log(response);
    },
    methods: {
        login: async function () {
            try {
                this.$nuxt.$loading.start();
                await this.$axios.post('/auth/login', this.formData);
                await this.$auth.login({data: this.formData});
                this.$nuxt.$loading.finish();
                await this.$router.push({path: '/'})
            } catch (error) {
                await this.$nuxt.$loading.finish();
                const errorMessages = ErrorHandler.getMessagesByFormRequestValidations(error);
                if (errorMessages) {
                    this.errorMessages = errorMessages ?? this.errorMessages;
                } else {
                    const msg = ErrorHandler.getError(error);
                    if (msg === 'Unauthorized') {
                        await this.$dialog.error({
                            title: 'Erro',
                            text: 'Email e/ou senha inválidos',
                        });
                    } else if (msg === 'Unchecked') {
                        const user = {email: this.formData.email.toString()};
                        await this.$router.push({name: 'auth-account-validation', params: {user: user}});
                    } else {
                        await this.$dialog.error({
                            title: 'Erro',
                            text: msg,
                        });
                    }
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
