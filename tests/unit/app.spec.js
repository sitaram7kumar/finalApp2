import { shallowMount } from '@vue/test-utils'
import App from '@/app.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'

describe('app.vue Component', () => {
  let wrapper

  it('should have header and footer component', () => {
    wrapper = shallowMount(App, {
      stubs: ['router-view']
    })
    expect(wrapper.findAllComponents(AppHeader)).toHaveLength(1)
    expect(wrapper.findAllComponents(AppFooter)).toHaveLength(1)
  })
})
