import { shallowMount } from '@vue/test-utils'
import Rating from '@/components/rating.vue'

describe('app-header.vue Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Rating)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders successfully', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
