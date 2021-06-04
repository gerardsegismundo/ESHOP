import Head from 'next/head'
import Link from 'next/link'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

const Signin = () => {
  const initialState = { email: 'gerard@gmail.com', password: '123456' }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData

  const { state, dispatch } = useContext(DataContext)
  const { auth } = state

  const router = useRouter()

  const handleOnChange = ({ target }) => {
    setUserData({ ...userData, [target.name]: target.value })

    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleOnSubmit = async e => {
    e.preventDefault()

    dispatch({ type: 'NOTIFY', payload: { loading: true } })

    const res = await postData('auth/signin', userData)
    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

    dispatch({ type: 'NOTIFY', payload: { success: res.msg } })

    dispatch({
      type: 'AUTH',
      payload: {
        token: res.refresh_token,
        user: res.user
      }
    })

    Cookie.set('refresh_token', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7
    })

    localStorage.setItem('isAuthenticated', true)
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      router.push('/')
    }
  }, [auth])

  return (
    <div>
      <Head>
        <title>Sign in Page</title>
      </Head>
      <form className='mx-auto my-4' style={{ maxWidth: '40rem' }} onSubmit={handleOnSubmit}>
        <div className='form-group'>
          <label htmlFor='exampleInputEmail1'>Email address</label>
          <input name='email' value={email} type='email' className='form-control' onChange={handleOnChange} />
          <small className='form-text text-muted'>We'll never share your email with anyone else.</small>
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input name='password' value={password} type='password' className='form-control' onChange={handleOnChange} />
        </div>
        <button type='submit' className='btn btn-dark my-3'>
          Login
        </button>

        <p className='mt-2'>
          You don't have an account?{' '}
          <Link href='/register'>
            <a style={{ color: 'crimson' }}>Register</a>
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Signin
