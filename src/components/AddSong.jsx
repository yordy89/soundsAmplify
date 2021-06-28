import React, { useState } from 'react'
import styled from 'styled-components'
import { Paper, Button, TextField, Box, Typography } from '@material-ui/core'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { createSong } from 'graphql/mutations'
import { v4 as uuid } from 'uuid'

const AddSong = ({ setAddSong, setSongs }) => {
  const [song, setSong] = useState({
    id: uuid(),
    title: '',
    description: '',
    like: 0,
    filePath: '',
    owner: ''
  })
  const [mp3Data, setMp3Data] = useState()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const { key } = await Storage.put(`${uuid()}.mp3`, mp3Data, { contentType: 'audio/mp3' })
      const addSong = song
      addSong.filePath = key
      const newSong = await API.graphql(graphqlOperation(createSong, { input: addSong }))
      setSongs(songs => [...songs, newSong.data.createSong])
      setAddSong(false)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setAddSong(false)
      setLoading(false)
    }

  }

  const onChange = (e) => {
    setSong({
      ...song,
      [e.target.name]: e.target.value
    })
  }


  return (
    <Container elevation={5}>
      <TitleContainer>
        <Typography variant='h5'>Add Songs</Typography>
      </TitleContainer>
      <form onSubmit={onSubmit}>
        <OptionConainer>
          <TextField name='title' onChange={onChange} variant='outlined' id="title" label="Song title" />
        </OptionConainer>
        <OptionConainer>
          <TextField name='description' onChange={onChange} variant='outlined' id="description" label="Description" />
        </OptionConainer>
        <OptionConainer>
          <TextField type='file' accept='audio/mp3' name='filePath' onChange={e => setMp3Data(e.target.files[0])} variant='outlined' id="filePath" label="Path" />
        </OptionConainer>
        <OptionConainer>
          <TextField name='owner' onChange={onChange} variant='outlined' id="owner" label="Owner" />
        </OptionConainer>
        <Button type='submit' fullWidth variant='contained' color='primary'>
          {loading ? 'Loading Song' : 'Add Song'}
        </Button>
      </form>
    </Container>
  )
}

export default AddSong

export const Container = styled(Paper)`
  width: 400px;
  height: 100%;
  padding: 10px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  width: 100%;
`;

export const OptionConainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 5px;
`;
