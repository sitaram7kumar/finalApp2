import { shallowMount } from '@vue/test-utils'
import Details from '@/views/details.vue'
import flushPromises from 'flush-promises'
import eventBus from '@/event-bus'
import axios from 'axios'

jest.mock('axios')

describe('details.vue Component', () => {
  let wrapper
  const data = {
    data: {
      id: 180,
      name: 'test',
      url: 'http://www.tvmaze.com/shows/180/firefly',
      genres: [],
      schedule: {
        time: '20:00',
        days: ['Friday']
      },
      rating: {
        average: 9.2
      },
      externals: {
        tvrage: 3548,
        thetvdb: 78874,
        imdb: 'tt0303461'
      },
      image: {
        medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/1/2600.jpg',
        original: 'http://static.tvmaze.com/uploads/images/original_untouched/1/2600.jpg'
      },
      summary: 'summary',
      person: {
        id: ''
      }
    }
  }

  const $route = {
    path: '/details',
    params: {
      showid: 1
    }
  }

  const mocks = {
    methods: {
      goHome: jest.fn()
    },
    $router: {
      push: jest.fn(),
      catch: jest.fn()
    },
    $route
  }

  beforeEach(() => {
    wrapper = shallowMount(Details, { mocks, eventBus })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders successfully', () => {
    axios.get.mockResolvedValue(data)
    expect(wrapper.exists()).toBe(true)
  })

  it('should print title of show', async () => {
    axios.get.mockResolvedValue(data)
    await flushPromises()
    expect(wrapper.findAll('h1')).toHaveLength(1)
    expect(wrapper.find('h1').text()).toBe('test')
  })

  it('should call eventBus $on method when changedInput emited', async () => {
    axios.get.mockResolvedValue(data)
    eventBus.$emit('changeInput', {})
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$router.push).toHaveBeenCalled()
  })

  it('should not print h1 title on error', async () => {
    axios.get.mockRejectedValue(new Error())
    wrapper = shallowMount(Details, { mocks, eventBus })
    await flushPromises()
    expect(wrapper.findAll('h1')).toHaveLength(0)
  })

  it('should go to else block when NAN is passed to showid', async () => {
    wrapper = shallowMount(Details, {
      mocks: {
        ...mocks,
        ...{
          $route: {
            path: '/',
            params: {
              showid: 'test'
            }
          }
        }
      }
    })
    await flushPromises()
    expect(wrapper.vm.$router.push).toHaveBeenCalled()
  })
})
