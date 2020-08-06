import { getters, mutations, actions } from '../../src/store'
import { UPDATE_STATE, LOAD_TV_SHOWS, SEARCH_TV_SHOWS } from '../../src/store/mutation-action-types'
import flushPromises from 'flush-promises'
import axios from 'axios'
jest.mock('axios')

const { allGenre } = getters

describe('VUEX store', () => {
  it('should update state property with UPDATE_STATE mutation', () => {
    const state = { searchString: '', tvShows: [] }
    mutations[UPDATE_STATE](state, { key: 'searchString', value: 'test' })
    expect(state.searchString).toBe('test')
  })

  it('allGenre return all different Genres', () => {
    const state = { tvShows: [{ genres: ['a', 'b'] }, { genres: ['b', 'c'] }] }

    const result = allGenre(state)
    expect(result).toEqual([...new Set(['a', 'b', 'b', 'c'])])
  })

  test('should LOAD_TV_SHOWS action load tvshows', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          name: '',
          genres: []
        }
      ]
    })
    const commit = jest.fn()
    actions[LOAD_TV_SHOWS]({ commit })
    await flushPromises()
    expect(commit).toHaveBeenCalledTimes(4)
  })

  it('should catch Error in LOAD_TV_SHOWS action', async () => {
    axios.get.mockRejectedValue(new Error(''))
    const commit = jest.fn()
    actions[LOAD_TV_SHOWS]({ commit })
    await flushPromises()
    expect(commit).toHaveBeenCalledTimes(3)
  })

  it('should actions loads tvshows on search', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          name: '',
          genres: []
        }
      ]
    })
    const commit = jest.fn()
    actions[SEARCH_TV_SHOWS]({ commit }, 'test')
    await flushPromises()
    expect(commit).toHaveBeenCalledTimes(4)
  })

  it('should catch Error in SEARCH_TV_SHOWS action', async () => {
    axios.get.mockRejectedValue(new Error(''))
    const commit = jest.fn()
    actions[SEARCH_TV_SHOWS]({ commit })
    await flushPromises()
    expect(commit).toHaveBeenCalledTimes(3)
  })
})
