import Head from 'next/head'
import Link from 'next/link'
import { useState, useContext, useEffect } from 'react'
import validateRegister from '../utils/validateRegister'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import router from 'next/router'

const Register = () => {
  // const initialState = { name: '', email: '', password: '', cf_password: '' }
  const initialState = { name: 'Gerard', email: 'gerard@gmail.com', password: '123456', cf_password: '123456' }
  const [userData, setUserData] = useState(initialState)
  const { name, email, password, cf_password } = userData

  const { state, dispatch } = useContext(DataContext)
  const { auth } = state

  const handleOnChange = ({ target }) => {
    setUserData({ ...userData, [target.name]: target.value })

    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleOnSubmit = async e => {
    e.preventDefault()

    const errMsg = validateRegister(userData)

    if (errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg } })

    dispatch({ type: 'NOTIFY', payload: { loading: true } })

    const res = await postData('auth/register', userData)
    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
  }

  useEffect(() => {
    if (Object.keys(auth).length === 0) router.push('/')
  }, [auth])

  return (
    <div>
      <Head>
        <title>Register Page</title>
      </Head>
      <form className='mx-auto my-4' onSubmit={handleOnSubmit} style={{ maxWidth: '40rem' }}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' className='form-control' id='name' name='name' value={name} onChange={handleOnChange} />
        </div>

        <div className='form-group'>
          <label htmlFor='exampleInputEmail1'>Email address</label>
          <input
            name='email'
            type='email'
            className='form-control'
            name='email'
            value={email}
            onChange={handleOnChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className='form-group'>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input type='password' className='form-control' name='password' value={password} onChange={handleOnChange} />
        </div>

        <div className='form-group'>
          <label htmlFor='exampleInputPassword2'>Confirm Password</label>
          <input
            type='password'
            className='form-control'
            name='cf_password'
            value={cf_password}
            onChange={handleOnChange}
          />
        </div>

        <button type='submit' className='btn btn-dark my-3'>
          Register
        </button>

        <p className='mt-2'>
          Already have an account?{' '}
          <Link href='/signin'>
            <a style={{ color: 'crimson' }}>Login</a>
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
