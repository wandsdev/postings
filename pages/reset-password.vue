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
                        value="joao@oi.com"
                        readonly
                        label="Email"
                        type="email"
                    ></v-text-field>
                    <v-text-field
                        color="purple"
                        prepend-inner-icon="mdi-pound-box"
                        outlined
                        label="Código de verificação"
                        type="text"
                    ></v-text-field>
                    <v-text-field
                        color="purple"
                        prepend-inner-icon="mdi-lock"
                        outlined
                        label="Senha"
                        type="password"
                    ></v-text-field>
                    <v-text-field
                        color="purple"
                        prepend-inner-icon="mdi-lock"
                        outlined
                        label="Repetir Senha"
                        type="password"
                    ></v-text-field>
                    <v-btn color="purple" block dark large @click="">
                        Atualizar senha
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
        <v-row class="flex-column align-center mt-4">
            <span class="login-link purple--text subtitle-1 text-decoration-underline">Reenviar código de verificação</span>
            <span class="login-link purple--text subtitle-1 text-decoration-underline mb-10">Fazer login</span>
        </v-row>
    </v-container>
</template>

<script>
export default {
    auth: 'guest',
    name: "reset-password",
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
