import React from 'react'
import styled from 'styled-components'
import { AppBar, Chip, InputAdornment, Box, Button, InputBase, useMediaQuery, useTheme } from '@material-ui/core'
import { Search } from '@material-ui/icons'

const NavBar = ({ chips, onDelete, onChange, onKeyPress, onClick, value }) => {
    const theme = useTheme()
    const match = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <StyledAppBar position='relative'>
            <StyledToolbar theme={theme}>
                <StyledIcon />
                <StyledInput
                    theme={theme}
                    variant='standard'
                    size='small'
                    placeholder='New Contact'
                    value={value}
                    disabled={match ? chips.length == 4 : chips.length == 6}
                    startAdornment={
                        chips.map(chip =>
                            <InputAdornment key={chip.id} position="start">
                                <Chip size='small' onDelete={() => onDelete(chip.id)} label={chip.text} />
                            </InputAdornment>
                        )
                    }
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    autoFocus
                />
                <StyledButton onClick={onClick} size='small' variant='contained'>Search</StyledButton>
            </StyledToolbar>
        </StyledAppBar>
    )
}

export default NavBar

const StyledAppBar = styled(AppBar)`
    display:flex;
    align-items:center;
    justify-content: center;
    background-color:black;
`

const StyledToolbar = styled(Box)`
    display: flex;
    gap:1rem;
    background-color: white;
    padding: .3rem;
    width: 90%;
    height: 30%;
    ${props => props.theme.breakpoints.down('sm')}{
        width: 100%;
        height: 100%;
    }
`

const StyledIcon = styled(Search)`
    width:10%;
    height:90%;
    color:gray;
`
const StyledInput = styled(InputBase)`
    flex:3;
    height:100%;
    overflow: hidden;
    ${props => props.theme.breakpoints.down('sm')}{
        width: 100%;
        overflow-x: scroll;
    }
`

const StyledButton = styled(Button)`
    background-color: gray;
    color: white;
`
