import React, { useEffect, useState } from 'react'
import { Typography, Paper, IconButton, Button } from '@material-ui/core'
import { PlayArrow, Favorite, Close, Pause } from '@material-ui/icons'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import styled from 'styled-components'
import { listSongs } from 'graphql/queries'
import AddSong from './AddSong'
import { deleteSong, updateSong } from 'graphql/mutations'
import ReactPlayer from 'react-player'

const ListSongs = () => {
  const [songs, setSongs] = useState([])
  const [addSong, setAddSong] = useState(false)
  const [songPlaying, setSongPlaying] = useState('')
  const [audioURL, setAudioURL] = useState('')

  useEffect(() => {
    fetchSongs()
  }, [])

  const toggleSongPlaying = async (idx) => {
    if (songPlaying === idx) {
      setSongPlaying('')
      return
    }

    const songFilePath = songs[idx].filePath;
    try {
      const fileAccessURL = await Storage.get(songFilePath, { expires: 60 })
      console.log(fileAccessURL)
      setSongPlaying(idx)
      setAudioURL(fileAccessURL)
      return
    } catch (error) {
      console.log(error)
      setSongPlaying('')
      setAudioURL('')
    }


  }

  const fetchSongs = async () => {
    try {
      const dataSongs = await API.graphql(graphqlOperation(listSongs))
      const songList = dataSongs.data.listSongs.items;
      console.log('song list', songList)
      setSongs(songList)
    } catch (error) {
      console.log(error)
    }
  }

  const addLike = async (idx) => {
    try {
      const song = songs[idx]
      const like = song.like + 1
      song.like = like
      API.graphql(graphqlOperation(updateSong, { input: { id: song.id, like } }))
      const newSongs = [...songs]
      newSongs[idx] = song
      setSongs(newSongs)
    } catch (error) {
      console.log(error)
    }
  }

  const eliminarSong = async (id) => {
    try {
      await API.graphql(graphqlOperation(deleteSong, { input: { id } }))
      const songList = songs.filter(song => song.id !== id)
      setSongs(songList)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Content>
      {
        songs.map((song, idx) => {
          return (
            <Container key={idx}>
              <SongContainer variant='outlined' elevation={2} >
                <IconPlay onClick={() => toggleSongPlaying(idx)}>
                  {songPlaying === idx ? <Pause /> : <PlayArrow />}
                </IconPlay>
                <TitleContainer>
                  <Typography variant='subtitle1'>{song.title}</Typography>
                  <Typography variant='body1'>{song.owner}</Typography>
                </TitleContainer>
                <LikeContainer onClick={() => addLike(idx)}>
                  <Favorite style={{ marginRight: '10px', cursor: 'pointer', }} />
                  {song.like}
                </LikeContainer>
                <DescriptionContainer>
                  <Typography variant='body1'>{song.description}</Typography>
                </DescriptionContainer>
                <DeleteContainer onClick={() => eliminarSong(song.id)}>
                  <Close /> Delete
                </DeleteContainer>
              </SongContainer>
              {songPlaying === idx
                ? <ReactPlayer
                  url={audioURL}
                  controls
                  playing
                  height='50px'
                  onPause={() => toggleSongPlaying(idx)}
                />
                : null
              }
            </Container>
          )
        })
      }
      {
        addSong
          ? <AddSongContainer>
            <AddSong setAddSong={setAddSong} setSongs={setSongs} />
          </AddSongContainer>
          : <Button onClick={setAddSong}>Add Song</Button>
      }
    </Content>
  )
}

export default ListSongs

export const Content = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const SongContainer = styled(Paper)`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

export const IconPlay = styled(IconButton)`
  width: 30px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LikeContainer = styled.div`
  display: flex;
  width: 40px;
  align-items: center;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const AddSongContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const DeleteContainer = styled.div`
  display: flex;
  align-items: center;
  color:'red';
  cursor: pointer;
  gap: 3px;
`;
