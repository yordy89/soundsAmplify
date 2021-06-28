import React, { useState } from 'react'
import { TextField, Button, Paper } from '@material-ui/core'
import styled from 'styled-components'
import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  const history = useHistory()

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async () => {
    try {
      await Auth.signIn(user.username,user.password)
      history.push('/songList')
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <Container>
      <PaperContainer elevation={5}>
        <TextField type='text' name='username' onChange={onChange} variant='outlined' id="username" label="Username" />
        <TextField type='password' name='password' onChange={onChange} variant='outlined' id="password" label="Password" />
        <Button fullWidth variant='contained' onClick={onSubmit}>Login</Button>
      </PaperContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaperContainer = styled(Paper)`
  width: 300px;
  height: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 100px;
`
