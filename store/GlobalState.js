import { createContext, useReducer, useEffect } from 'react'
import reducers from './Reducers'
import { getData } from '../utils/fetchData'

export const DataContext = createContext()

const initialState = {
  notify: {},
  auth: {},
  cart: [],
  modal: [],
  orders: [],
  users: [],
  categories: []
}

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState)
  const { cart, auth } = state

  const getUser = async () => {
    try {
      const { access_token, user } = await getData('auth/accessToken')

      dispatch({ type: 'AUTH', payload: { token: access_token, user } })
    } catch (err) {
      console.log(err)
      localStorage.removeItem('isAuthenticated')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('isAuthenticated')) {
      getUser()
    }
  }, [auth.token])

  return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>
}
