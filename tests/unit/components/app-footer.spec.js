import { shallowMount } from '@vue/test-utils'
import appFooter from '@/components/app-footer.vue'

describe('app-header.vue Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(appFooter)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders successfully', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
