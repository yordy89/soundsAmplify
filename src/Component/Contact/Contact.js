import React from 'react'
import styled from 'styled-components'
import { Card, CardContent, Grid, Box, TextField, withTheme } from '@material-ui/core'
import NavBar from 'Component/NavBar'
import ContactList from 'Component/ContactList'

const Contact = ({ contact, handleChange, handleAdd, errors, theme }) => {
    return (
        <Wrapper theme={theme}>
            <NavBar />
            <StyledCard elevation={5}>
                <StyledCardContent>
                    <WrapperAdd theme={theme}>
                        <StyledBox>
                            <Title>Name</Title>
                            <Content
                                name='name'
                                variant='outlined'
                                size='small'
                                focused
                                value={contact.name}
                                onChange={handleChange}
                                required
                                inputProps={{
									maxLength: 15
								}}
                                error={errors.name}
                            />
                        </StyledBox>
                        <StyledBox>
                            <Title>Address</Title>
                            <Content
                                name='address'
                                variant='outlined'
                                size='small'
                                value={contact.address}
                                onChange={handleChange}
                                error={errors.address}
                                required
                            />
                        </StyledBox>
                        <StyledBox>
                            <Title>Phone Number</Title>
                            <Content
                                name='phoneNumber'
                                variant='outlined'
                                size='small'
                                value={contact.phoneNumber}
                                onChange={handleChange}
                                error={errors.phoneNumber}
                                required
                            />
                        </StyledBox>
                        <StyledBox>
                            <Title>Email</Title>
                            <Content
                                name='email'
                                variant='outlined'
                                size='small'
                                value={contact.email}
                                onChange={handleChange}
                                error={errors.email}
                                required
                            />
                        </StyledBox>
                        <Operations>
                            <Action onClick={handleAdd}>Add</Action>
                        </Operations>
                    </WrapperAdd>
                    <ContactList />
                </StyledCardContent>
            </StyledCard>
        </Wrapper>
    )
}

export default withTheme(Contact)

const Wrapper = styled.div`
    width:60%;
    height:90%;
    background-color: rgba(0, 0, 0, .1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:2rem;
    padding-bottom: 1rem;
    ${props=> props.theme.breakpoints.down('md')}{
        width:100%;
    };
`
const StyledCard = styled(Card)`
    width:95%;
    height:90%;
`

const StyledCardContent = styled(CardContent)`
    height:90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    overflow-y: scroll;
`

const WrapperAdd = styled(Grid)`
    width:95%;
    padding:.2rem;
    margin-bottom:.2rem;
    border: solid .1rem rgba(0,0,0,.1);
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap:.3rem;
    ${props=> props.theme.breakpoints.down('md')}{
        grid-template-columns: 1fr;
    };
`
const StyledBox = styled(Box)`
    display:flex;
    flex-direction:column;
`
const Title = styled.span`
    font-size: .8rem;
    color: rgba(0,0,0,.3);
`
const Content = styled(TextField)`
    font-size: 1rem;
`
const Operations = styled(Box)`
    display: flex;
    align-items:center;
    justify-content: center;
`
const Action = styled.span`
    font-size: .8rem;
    color: rgba(0,0,0,.3);
    cursor: pointer;
    text-decoration: underline;
`
