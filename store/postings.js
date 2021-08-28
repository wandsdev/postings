export const state = () => ({
    postings: [],
    posting: {}
})

export const mutations = {
    setPosting (state, payload) {
        state.posting = payload
    }
}

export const getters = {
    getPosting: (state) => state.posting
}
