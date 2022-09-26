import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { getTokenFromStorage } from '../helpers'
import './header.css'

export default function Header() {

  const {logOut} = useContext(UserContext)

  return (
    <div className='header-container'>
    <div className='header-title'>
        <h1>Welcome  application</h1>
    </div>
    <div className='header-button'>

        {getTokenFromStorage() !== null ? <button onClick={logOut}>LOGOUT</button> : <></> }
    </div>
    </div>
  )
}
