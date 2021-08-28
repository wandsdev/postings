<template>
    <v-card class="mx-auto" style="max-width: 100vw; height: calc(100vh - 80px);">
        <v-tabs v-model="tab"  background-color="purple" centered fixed-tabs dark icons-and-text>
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1">Dados<v-icon>mdi-account</v-icon></v-tab>
            <v-tab href="#tab-2">Senha<v-icon>mdi-pencil</v-icon></v-tab>
            <v-tab href="#tab-3">Foto<v-icon>mdi-upload</v-icon></v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item :value="'tab-1'">
                <v-card flat>
                    <v-form lazy-validation class="mt-3 px-2" ref="formEditUser" v-model="valid">
                        <v-text-field
                            dense
                            color="purple"
                            v-model="formEditUser.name"
                            prepend-inner-icon="mdi-account"
                            outlined
                            :rules="[requiredRules]"
                            label="Nome"
                            required
                        ></v-text-field>
                        <v-text-field
                            dense
                            color="purple"
                            :rules="[requiredRules]"
                            disabled
                            v-model="formEditUser.email"
                            prepend-inner-icon="mdi-email"
                            outlined
                            label="Email"
                            type="email"
                        ></v-text-field>

                        <v-btn class="mb-2" dark block color="purple" @click="save">Salvar</v-btn>
                        <v-btn outlined dark block color="purple" @click="cancel">Cancelar</v-btn>

                    </v-form>
                </v-card>
            </v-tab-item>
            <v-tab-item :value="'tab-2'">
                <v-card flat>
                    <v-form lazy-validation class="mt-3 px-2" ref="formUpdatePassword" v-model="validUpdatePassword">
                        <v-text-field
                            dense
                            v-model="formUpdatePassword.oldPassword"
                            color="purple"
                            prepend-inner-icon="mdi-lock"
                            outlined
                            :rules="[requiredRules, minLength]"
                            label="Senha atual"
                            type="password"
                            required
                        ></v-text-field>
                        <v-text-field
                            dense
                            v-model="formUpdatePassword.newPassword"
                            color="purple"
                            prepend-inner-icon="mdi-lock"
                            outlined
                            :rules="[requiredRules, minLength]"
                            label="Nova senha"
                            type="password"
                            required
                        ></v-text-field>
                        <v-text-field
                            dense
                            v-model="formUpdatePassword.confirmPassword"
                            color="purple"
                            prepend-inner-icon="mdi-lock"
                            outlined
                            :rules="[requiredRules, minLength]"
                            label="Confirme nova senha"
                            type="password"
                            required
                        ></v-text-field>

                        <v-btn class="mb-2" dark block color="purple" @click="updatePassword">Salvar</v-btn>
                        <v-btn outlined dark block color="purple" @click="resetUpdatePassword">Cancelar</v-btn>

                    </v-form>
                </v-card>
            </v-tab-item>
            <v-tab-item :value="'tab-3'">
                <v-card flat>
                    <v-form class="mt-3 px-2" ref="formUpdatePhoto" v-model="validUpdatePhoto">
                        <v-row class="justify-space-around mt-3">
                            <span class="subtitle-1 purple--text d-block">Foto atual:</span>
                            <span class="subtitle-1 purple--text d-block">Foto à ser salva:</span>
                        </v-row>
                        <v-row class="justify-space-around mb-5">
                            <v-avatar><img :src="getPhoto" alt="John"></v-avatar>
                            <v-avatar><img :src="previewImage || '/avatar.svg'" alt="John"></v-avatar>
                        </v-row>
                            <v-file-input
                                v-model="formUpdatePhoto.photo"
                                ref="photo"
                                accept="image/*"
                                label="File input"
                                @change="selectImage"
                                outlined
                                prepend-icon=""
                            ></v-file-input>

                        <v-btn class="mb-2" dark block color="purple" @click="savePhoto">Salvar</v-btn>
                        <v-btn outlined dark block color="purple" @click="cancelUpdatePhoto">Cancelar</v-btn>
                    </v-form>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
export default {
    name: "index",
    data: () => ({
        tab: null,
        previewImage: undefined,
        formEditUser: {
            name: '',
            email: '',
        },
        formUpdatePassword: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        formUpdatePhoto: {
            photo: {},
        },
        errors: {},
        valid: false,
        validUpdatePassword: false,
        validUpdatePhoto: false,
        minLength: v => (v && v.length >= 8) || 'A senha deve ter no mínimo 8 caracteres',
        requiredRules: v => !!v || 'Campo obrigatório',
        requiredFileRules: v => (v && v.size > 0) || 'Campo obrigatório',
    }),
    created() {
        this.formEditUser.name = this.$store.state.auth.user.name;
        this.formEditUser.email = this.$store.state.auth.user.email;
    },
    methods: {
        async save() {
            if (this.$refs.formEditUser.validate()) {
                this.$nuxt.$loading.start();
                try {
                    const user = await this.$axios.$put('/user', this.formEditUser);
                    this.$auth.setUser(user);
                    this.$nuxt.$loading.finish();
                    this.$notifier.showMessage({ content: "Nome alterado com sucesso.", color: 'success' });
                } catch (e) {
                    this.$nuxt.$loading.finish();
                    if (e.response.data.errors && Object.keys(e.response.data.errors).length) {
                        this.$notifier.showMessage({ content: "Erro ao editar usuario! Verifique seo dados enviados no formulário estão corretos.", color: 'error' });
                    } else if (e.response.data.message) {
                        this.$notifier.showMessage({ content: e.response.data.message, color: 'error' });
                    }

                }
            }
        },
        cancel() {
            this.formEditUser.name = this.$auth.user.name;
        },
        async updatePassword() {
            if (this.$refs.formUpdatePassword.validate()) {
                this.$nuxt.$loading.start();
                try {
                    this.formUpdatePassword.email = this.$auth.user.email;
                    const user = await this.$axios.$put('/user/password', this.formUpdatePassword);
                    this.$auth.setUser(user);

                    this.$nuxt.$loading.finish();
                    this.$notifier.showMessage({ content: "Senha alterada com sucesso.", color: 'success' });
                } catch (e) {
                    this.$nuxt.$loading.finish();
                    if (e.response.data.errors && Object.keys(e.response.data.errors).length) {
                        this.$notifier.showMessage({ content: "Erro ao editar senha! Verifique seo dados enviados no formulário estão corretos.", color: 'error' });
                    } else if (e.response.data.message) {
                        this.$notifier.showMessage({ content: e.response.data.message, color: 'error' });
                    }

                }
            }
        },
        cancelUpdatePassword() {
            this.resetUpdatePassword();
        },
        resetUpdatePassword() {
            this.formUpdatePassword = {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            };
            this.$refs.formUpdatePassword.resetValidation();
        },
        async savePhoto() {
            if (this.$refs.formUpdatePhoto.validate()) {
                this.$nuxt.$loading.start();
                try {
                    const data = new FormData();
                    data.append('photo', this.formUpdatePhoto.photo);
                    data.append('email', this.$store.state.auth.user.email);
                    const user = await this.$axios.$post('/user/photo', data);
                    this.$auth.setUser(user);
                    this.resetUpdatePhoto();
                    this.$nuxt.$loading.finish();
                    this.$notifier.showMessage({ content: "Photo salva com sucesso.", color: 'success' });
                } catch (e) {
                    this.$nuxt.$loading.finish();
                    if (e.response.data.errors && Object.keys(e.response.data.errors).length) {
                        this.$notifier.showMessage({ content: "Erro ao salvar foto! Verifique seo dados enviados no formulário estão corretos.", color: 'error' });
                    } else if (e.response.data.message) {
                        this.$notifier.showMessage({ content: e.response.data.message, color: 'error' });
                    }
                }
            }
        },
        cancelUpdatePhoto() {
          this.resetUpdatePhoto();
        },
        resetUpdatePhoto() {
            this.formUpdatePhoto = { photo: {} };
            this.previewImage = null;
            this.$refs.formUpdatePhoto.resetValidation();
        },
        selectImage(image) {
            const img = image;
            this.previewImage = img ? URL.createObjectURL(img) : null;
        },
    },
    computed: {
        getPhoto() {
            return this.$auth.user.photo_url || '/avatar.svg';
        }
    }
}
</script>

<style scoped>

</style>
