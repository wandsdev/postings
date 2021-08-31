<template>
    <v-container class="px-0 py-0">
        <v-row>
            <v-snackbar top right v-model="snack.show" :color="snack.color">
                {{ snack.message }}
                <v-btn class="float-end" icon @click="snack.show = false"><v-icon>mdi-close</v-icon></v-btn>
            </v-snackbar>
        </v-row>
        <v-row class="justify-center">
            <v-col cols="12" md="8" lg="4" class="px-0 mx-0 py-0">
                <v-card class="" style="height: 100vh; border: solid purple 2px;">
                    <v-form class="mt-16">
                        <v-img class="mb-10 mt-5" src="/logo.png"></v-img>
                        <v-card-text>
                            <v-text-field
                                color="purple"
                                v-model="formData.email"
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
                                v-model="formData.password"
                                label="Senha"
                                type="password"
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="purple" block dark large @click="doLogin">
                                Login
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
export default {
    auth: 'guest',
    name: "login",
    layout: 'clean',
    data: () => ({
        snack: {
            show: false,
            message: '',
            color: 'success',
        },
        formData: {
            email: '',
            password: ''
        }
    }),
    mounted() {
    },
    methods: {
        showSnack (message, color) {
            this.snack.show = true;
            this.snack.message = message;
            this.snack.color = color;
        },
        async doLogin() {
            try {
                this.$nuxt.$loading.start();
                const response = await this.$axios.post('/auth/login', this.formData);
                await this.$auth.login({data: this.formData});
                this.$nuxt.$loading.finish();
                await this.$router.push({path: '/'})
            } catch (e) {
                await this.$nuxt.$loading.finish();
                let error = '';
                if (e && e.response && e.response.data && e.response.data.error) {
                    error = e.response.data.error;
                    console.log(e.response.data.error);
                }
                this.showSnack(`Erro ao logar! ${error}` , 'error')
            }
        }
    }
}
</script>

<style scoped>


</style>
