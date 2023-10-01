import axios from 'axios'
import Config from '@/config/config'

const errorResponseHandler = (error) => {
  // if has response show the error
  if (error.response) {
    if (error.response && error.response.data && error.response.data.displayMsg) {
      // Toastr.error(error.response.data.displayMsg.e.msg, error.response.data.displayMsg.e.head)
    } else {
      console.log(error.status, error.message, error.response)
    }
  } else if (error.message) {
    console.log(error.message)
    // if (error.message === 'Network Error') Toastr.error('Please contact support team or try again', error.message)
    // else Toastr.error(String(error), 'Unhandled Exception')
  }
}

let axiosWebApi = axios.create({
  baseURL: Config.WAPI_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

// apply interceptor on request
// axiosWebApi.interceptors.request.use(
//   request => {
//     const isAuthenticated = !(store.getters.currentUser && !localStorage.token)
//     if (!isAuthenticated) {
//       this.$router.push('/signin')
//     } else {
//       request.headers.Authorization = 'Bearer ' + localStorage.token
//       return request
//     }
//   }
// )

// apply interceptor on response
axiosWebApi.interceptors.response.use(
  response => {
    return response
  },
  errorResponseHandler
)

export default axiosWebApi
