import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import show from '@/components/show.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)

const propsData = {
  details: {
    id: 1,
    name: '',
    genres: [],
    image: null
  }
}

describe('show.vue Component', () => {
  const wrapper = shallowMount(show, {
    localVue,
    propsData
  })

  it('renders successfully', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should print gallery-item', () => {
    expect(wrapper.findAll('.gallery-item')).toHaveLength(1)
  })

  it('should print show-genres', () => {
    expect(wrapper.findAll('.show-genres')).toHaveLength(1)
  })

  it('should print desc', () => {
    expect(wrapper.findAll('.desc')).toHaveLength(1)
  })

  it('should not print gallery', () => {
    const wrapper = shallowMount(show)
    expect(wrapper.findAll('.gallery')).toHaveLength(0)
  })
})
