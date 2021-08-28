<template>
    <v-app>
        <Snackbar></Snackbar>

		<v-app-bar dark color="purple" fixed app>
            <template v-if="isVisibleAppBar">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
                <v-spacer v-if="appBarIsTitle"></v-spacer>
                <v-toolbar-title v-text="appBarTitle || title" />
            </template>
            <template v-else>
                <v-icon @click="$router.go(-1)">mdi-arrow-left</v-icon>
                <v-spacer></v-spacer>
                <v-toolbar-title v-text="appBarTitle" />
            </template>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" temporary app>
            <v-list class="pt-0">
                <v-list-item style="background-color: #9C27B0; color: white" to="/profile" link>
                    <v-list-item-avatar>
                        <v-img :src="getPhoto"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="text-h6 mb-1 white--text">
                            {{ this.$store.state.auth.user.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="white--text">{{ this.$store.state.auth.user.email }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    class="mt-1"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon color="purple">{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="" v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <v-list color="purple">
                    <v-list-item class="mt-1" exact router @click="logout()">
                        <v-list-item-action>
                            <v-icon color="white">mdi-logout</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="white--text title" v-text="'Logout'" />
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>

        <v-main >
            <v-container fluid >
                <Nuxt />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Snackbar from '~/components/Snackbar.vue'

const routesIgnored = ['index', 'people', 'postings', 'periods', 'profile'];

export default {
    components: { Snackbar },
    data() {
        return {
            drawer: false,
            items: [
                {
                    icon: "mdi-home",
                    title: "Home",
                    to: "/"
                },
                {
                    icon: "mdi-cash-register",
                    title: "Lançamentos",
                    to: "/postings"
                },
                {
                    icon: "mdi-account-group",
                    title: "Pessoas",
                    to: "/people"
                },
                {
                    icon: "mdi-calendar-range",
                    title: "Períodos",
                    to: "/periods"
                },
                {
                    icon: "mdi-account-circle",
                    title: "Perfil",
                    to: "/profile"
                }
            ],
            title: "Postings"
        };
    },
    created() {
        console.log();
    },
    methods: {
        async logout() {
            await this.$auth.logout()
        }
    },
    computed: {
        appBarIsTitle() {
            return !routesIgnored.includes(this.$route.name);
        },
        ...mapState([
             'isVisibleAppBar', 'appBarTitle'
         ]),
        getPhoto() {
            return this.$auth.user.photo_url || '/avatar.svg';
        }
    }
};
</script>
