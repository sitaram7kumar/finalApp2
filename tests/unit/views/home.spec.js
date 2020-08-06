import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import home from '@/views/home.vue'
import eventBus from '@/event-bus.js'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('home.vue Component', () => {
  let getters
  let store
  let wrapper

  beforeEach(() => {
    getters = {
      allGenre: () => ['test']
    }
    store = new Vuex.Store({
      getters
    })
    wrapper = shallowMount(home, { localVue, store })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders successfully', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should Update data props on changeInput method', () => {
    wrapper.vm.changeInput({ searchString: '1', selectedGenre: '2' })
    expect(wrapper.vm.searchString).toBe('1')
    expect(wrapper.vm.selectedGenre).toBe('2')
  })

  it('should trigger $on method on event bus emit', async () => {
    eventBus.$emit('change-input', { searchString: 'test', selectedGenre: '' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.searchString).toBe('test')
    expect(wrapper.vm.selectedGenre).toBe('')
  })
})
