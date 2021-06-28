import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'

const NavBar = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(false)
  const history = useHistory()
  const handleLogin = async () => {
    if (userAuthenticated) {
      await Auth.signOut()
      history.push('/')
    } else {
      history.push("/login")
    }
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => {
        setUserAuthenticated(true)
      })
      .catch(() => {
        setUserAuthenticated(false)
      })
  }, [])
  return (
    <AppBar position="static">
      <Toolbar>
        <NavbarContainer>
          <Typography variant='h3' style={{ marginRight: '550px' }}>Songs App</Typography>
          <LoginLogout onClick={handleLogin}>{userAuthenticated ? 'Logout' : 'Login'}</LoginLogout>
        </NavbarContainer>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar


export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-space-around;
  align-items: center;
`;

export const LoginLogout = styled.span`
  color: #fff;
  font-size: 24px;
  margin-left: auto;
  cursor: pointer;
`;
