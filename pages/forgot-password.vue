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
                        ></v-text-field>
                        <v-btn color="purple" block dark large @click="">
                            Enviar
                        </v-btn>
                </v-form>
            </v-col>
        </v-row>
        <v-row class="flex-column align-content-center mt-5">
            <span class="login-link purple--text subtitle-1 text-decoration-underline">Fazer login</span>
            <span class="login-link purple--text subtitle-1 text-decoration-underline">Registre-se</span>
        </v-row>

    </v-container>
</template>

<script>
export default {
    auth: 'guest',
    name: "forgot-password",
    layout: 'clean',
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
