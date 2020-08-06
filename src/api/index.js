import axios from 'axios'

axios.defaults.baseURL = 'http://api.tvmaze.com'

export const sortTvShowes = (data) => {
  return data.sort((a, b) => b.rating.average - a.rating.average)
}

export const loadTvShows = async () => {
  try {
    let response = await axios.get('/shows')
    response = await sortTvShowes(response.data)
    return response
  } catch (error) {
    throw new Error(error)
  }
}

export const searchTvShows = async (searchString) => {
  try {
    let response = await axios.get(`/search/shows?q=${searchString}`)
    response = await response.data.map(d => d.show)
    response = await sortTvShowes(response)
    return response
  } catch (error) {
    throw new Error(error)
  }
}

export const getShowDetails = async (showid) => {
  try {
    const response = await Promise.all([
      axios.get(`/shows/${showid}`),
      axios.get(`/shows/${showid}/cast`)
    ])
    return response
  } catch (error) {
    throw new Error(error)
  }
}
