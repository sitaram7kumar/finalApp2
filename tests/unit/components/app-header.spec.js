import { shallowMount } from '@vue/test-utils'
import appHeader from '@/components/app-header.vue'

describe('app-header.vue Component', () => {
  let wrapper

  beforeEach(() => {
    const $route = {
      path: ''
    }
    wrapper = shallowMount(appHeader, {
      mocks: {
        $route
      },
      stubs: ['router-link']
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders successfully', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
