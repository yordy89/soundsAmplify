import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const Home = () => {
  return (
    <Container>
      <Typography variant='h3'>
        Agrgega las canciones de tu prefrencia
      </Typography>
    </Container>
  )
}

export default Home

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
