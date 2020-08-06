import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import AllShows from '@/components/all-shows.vue'
import { LOAD_TV_SHOWS, SEARCH_TV_SHOWS } from '@/store/mutation-action-types'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('all-shows.vue Component', () => {
  let wrapper, state, getters, store, actions, mutations

  beforeEach(() => {
    state = {
      tvShows: [{ id: 1, name: '', genres: ['test'] }],
      error: false,
      searchString: ''
    }
    getters = {
      allGenre: () => ['test']
    }

    actions = {
      [LOAD_TV_SHOWS]: jest.fn(),
      [SEARCH_TV_SHOWS]: jest.fn()
    }

    mutations = {
      updateState: jest.fn()
    }

    store = new Vuex.Store({
      state,
      getters,
      mutations,
      actions
    })

    wrapper = shallowMount(AllShows, {
      localVue,
      store,
      propsData: {
        searchString: '',
        selectedGenre: ''
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders successfully', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should filteredShows method filter tv shows on genres', () => {
    wrapper.setProps({ searchString: '', selectedGenre: 'test3' })
    wrapper.vm.$store.state.tvShows = [{ id: 2, name: 'test', genres: ['test2'] }]
    expect(wrapper.vm.filteredShows.length).toBe(0)
  })

  it('Should call actions when search string value changes ', async () => {
    const wrapper2 = shallowMount(AllShows, {
      localVue,
      store: new Vuex.Store({
        state: {
          tvShows: [],
          error: false,
          searchString: ''
        },
        getters,
        mutations,
        actions
      }),
      propsData: {
        searchString: '',
        selectedGenre: ''
      }
    })

    wrapper2.setProps({ searchString: 'test', selectedGenre: '' })
    await flushPromises()
    expect(actions[[SEARCH_TV_SHOWS]]).toHaveBeenCalled()

    wrapper2.setProps({ searchString: '', selectedGenre: '' })
    await flushPromises()
    expect(actions[LOAD_TV_SHOWS]).toHaveBeenCalled()
  })
})
