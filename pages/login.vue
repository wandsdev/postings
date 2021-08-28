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
                            name="login"
                            label="Email"
                            type="text"
                        ></v-text-field>
                        <v-text-field
                            color="purple"
                            prepend-inner-icon="mdi-lock"
                            outlined
                            label="Senha"
                            type="password"
                        ></v-text-field>
                        <v-btn color="purple" block dark large @click="">
                            Entrar
                        </v-btn>
                </v-form>
            </v-col>
        </v-row>
        <v-row class="justify-space-between mt-2">
            <span class="login-link purple--text subtitle-1">Esqueceu a senha?</span>
<!--            <v-btn class="mt-2 text-none" text rounded dark color="purple">Esqueceu a senha?</v-btn>-->
<!--            <v-btn class="mt-2 text-none" text rounded dark color="purple">Registre-se</v-btn>-->
            <span class="login-link purple--text subtitle-1">Registre-se</span>
        </v-row>
<!--        <v-row class="justify-center mt-10">-->
<!--            <v-btn small dark color="purple">Registre-se</v-btn>-->
<!--        </v-row>-->
    </v-container>
</template>

<script>
export default {
    name: "login",
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
