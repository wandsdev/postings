export const state = () => ({
    isVisibleAppBar: true,
    appBarTitle: ''
});

export const mutations = {
    setIsVisibleAppBar(state, value) {
        state.isVisibleAppBar = value;
    },
    setAppBarTitle(state, value) {
        state.appBarTitle = value;
    }
};
