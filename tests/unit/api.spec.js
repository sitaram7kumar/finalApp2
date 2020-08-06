import { sortTvShowes } from '@/api'
jest.mock('axios')

describe('Api service', () => {
  it('should sort tv shows based on rating with method sortTvShowes', () => {
    const data = [{ id: 1, rating: { average: 1 } }, { id: 2, rating: { average: 2 } }]
    const result = sortTvShowes(data)
    expect(result[0]).toEqual({ id: 2, rating: { average: 2 } })
  })
})
