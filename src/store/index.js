import Vue from 'vue'
import Vuex from 'vuex'
import { loadTvShows, searchTvShows } from '@/api'
import { UPDATE_STATE, LOAD_TV_SHOWS, SEARCH_TV_SHOWS } from './mutation-action-types'

Vue.use(Vuex)

export const state = {
  tvShows: [],
  error: null,
  isFetching: false,
  searchString: ''
}

export const getters = {

  allGenre ({ tvShows }) {
    let allGenres = tvShows.map(s => s.genres.join())
    allGenres = allGenres.join().split(',').filter(g => g.length)

    return [...new Set(allGenres)]
  }

}

export const mutations = {

  [UPDATE_STATE]: (state, payload) => {
    state[payload.key] = payload.value
  }
}

export const actions = {

  async [LOAD_TV_SHOWS] ({ commit }) {
    commit(UPDATE_STATE, { key: 'isFetching', value: true })
    commit(UPDATE_STATE, { key: 'searchString', value: '' })
    try {
      const data = await loadTvShows()
      commit(UPDATE_STATE, { key: 'tvShows', value: data })
      commit(UPDATE_STATE, { key: 'isFetching', value: false })
    } catch (e) {
      commit(UPDATE_STATE, { key: 'error', value: e })
    }
  },

  async [SEARCH_TV_SHOWS] ({ commit }, payload) {
    commit(UPDATE_STATE, { key: 'isFetching', value: true })
    commit(UPDATE_STATE, { key: 'searchString', value: payload })

    try {
      const data = await searchTvShows(payload)
      commit(UPDATE_STATE, { key: 'tvShows', value: data })
      commit(UPDATE_STATE, { key: 'isFetching', value: false })
    } catch (e) {
      commit(UPDATE_STATE, { key: 'error', value: e })
    }
  }

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
