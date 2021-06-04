import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'

const Navbar = () => {
  const router = useRouter()
  const { state, dispatch } = useContext(DataContext)
  const { auth } = state

  const isActive = r => (r === router.pathname ? ' active' : '')

  const handleLogout = () => {
    Cookie.remove('refresh_token', { path: 'api/auth/accessToken' })
    localStorage.removeItem('isAuthenticated')
    dispatch({ type: 'AUTH', payload: {} })
    dispatch({ type: 'NOTIFY', payload: { success: 'Logged out.' } })
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link className='navbar-brand' href='/'>
        ESHOP
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNavDropdown'
        aria-controls='navbarNavDropdown'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse justify-content-end' id='navbarNavDropdown'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link className='nav-link' href='/cart'>
              <a className={'nav-link' + isActive('/cart')}>
                <i className='fas fa-shopping-cart' aria-hidden='true' />
                &nbsp;Cart
              </a>
            </Link>
          </li>
          {Object.keys(auth).length === 0 ? (
            <li className='nav-item'>
              <Link href='/signin'>
                <a className={'nav-link' + isActive('/signin')}>
                  <i className='fas fa-user' aria-hidden='true' />
                  &nbsp; Sign in
                </a>
              </Link>
            </li>
          ) : (
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdownMenuLink'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <img
                  src={auth.user.avatar}
                  alt='avatar'
                  style={{
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    transform: 'translateY(-3px)',
                    marginRight: '3px'
                  }}
                />
                {auth.user.name}
              </a>
              <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                <a className='dropdown-item' href='#'>
                  Profile
                </a>
                <button onClick={handleLogout} className='dropdown-item' href='#'>
                  Logout
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
