<template>
    <div>
        <v-card color="#385F73" dark @click="$router.push({name: 'postings'})" >
            <v-card-title class="text-h5">
                Lançamentos
            </v-card-title>

            <v-card-subtitle></v-card-subtitle>

            <v-card-actions>
                <v-btn text>
                <!--Listen Now-->
                </v-btn>
            </v-card-actions>
        </v-card>
        <br>
        <v-card color="#385F73" dark @click="$router.push({name: 'people'})" >
            <v-card-title class="text-h5">
                Pessoas
            </v-card-title>

            <v-card-subtitle></v-card-subtitle>

            <v-card-actions>
                <v-btn text>
                <!--Listen Now-->
                </v-btn>
            </v-card-actions>
        </v-card>
        <br>
        <v-card color="#385F73" dark @click="$router.push({name: 'periods'})" >
            <v-card-title class="text-h5">
                Períodos
            </v-card-title>

            <v-card-subtitle></v-card-subtitle>

            <v-card-actions>
                <v-btn text>
                <!--Listen Now-->
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    created() {
        this.$store.commit('setIsVisibleAppBar', true);
        this.$store.commit('setAppBarTitle', '');
    },
    methods: {
        setVisibleAppBar() {
			this.$store.commit('setIsVisibleAppBar');
		}
	},
    computed: mapState([
        'isVisibleAppBar'
    ])
};
</script>

<style lang="scss" scoped></style>
