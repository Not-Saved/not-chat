import axios from "axios"

const api = axios.create({
  baseURL: "/api",
})

export const apiRequest = async config => {
  try {
    const response = await api.request(config)
    return response
  } catch (e) {
    throw e.response || e
  }
}

export const giphyRequest = async (params, url = "gifs/search") => {
  try {
    const response = await axios.request({
      url: `https://api.giphy.com/v1/${url}?api_key=${process.env.GATSBY_GIPHY_KEY}`,
      params: params,
    })
    return response
  } catch (e) {
    throw e.response || e
  }
}
