import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import searchBar from '@/components/search-bar.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('search-bar.vue Component', () => {
  let wrapper
  const mocks = {
    eventBus: {
      $on: jest.fn(),
      $off: jest.fn(),
      $emit: jest.fn()
    },
    $router: {
      push: jest.fn(),
      catch: jest.fn()
    },
    $route: {
      path: '/'
    }
  }

  const getters = {
    allGenre: () => ['test', '']
  }

  const state = {
    searchString: ''
  }

  const store = new Vuex.Store({
    getters,
    state
  })

  beforeEach(() => {
    wrapper = shallowMount(searchBar, {
      store,
      mocks,
      localVue
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders successfully', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('input')).toHaveLength(1)
  })

  it('should render select element for home path', () => {
    wrapper.setProps({ $route: { path: '/' } })
    expect(wrapper.findAll('select')).toHaveLength(1)
  })

  it('should be empty for value of select Genre on changeInput method', async () => {
    wrapper.vm.changeInput(1)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('select').element.value).toBe('')
  })
})
