import colors from 'vuetify/es5/util/colors'

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - frontend',
        title: 'frontend',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/notifier.js'
    ],

    router: {
        middleware: ['auth']
    },

    auth: {
        strategies: {
            'laravelJWT': {
                provider: 'laravel/jwt',
                url: 'http://127.0.0.1:8000',
                endpoints: {
                    login: {
                        url: '/api/auth/login', method: 'post'
                    },
                    register: {
                        url: '/api/auth/register', method: 'post'
                    },
                    refresh: {
                        url: '/api/auth/refresh', method: 'post'
                    },
                    logout: {
                        url: '/api/auth/logout', method: 'post'
                    },
                    user: {
                        url: '/api/user', method: 'get'
                    }
                },
                token: {
                    property: 'access_token',
                    maxAge: 60 * 60
                },
                refreshToken: {
                    maxAge: 20160 * 60
                },
            },
        },
        redirect: {
            login: '/auth/login',
            logout: '/auth/login',
            home: false
        },
    },

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/content
        '@nuxt/content',
        ['v-currency-field/nuxt', {
            locale: 'pt-BR',
            prefix: 'R$',
            decimalLength: 2,
            autoDecimalMode: true,
            min: null,
            max: null,
            defaultValue: 0,
            valueAsInteger: false,
            allowNegative: true
        }],
        '@nuxtjs/auth-next',
        'vuetify-dialog/nuxt'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: 'http://127.0.0.1:8000/api',
        credentials: false,
        proxyHeaders: false,
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    // custom component loading with vuetify
    loading: '~/components/loading.vue',
}
