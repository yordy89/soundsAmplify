import React from 'react'
import styled from 'styled-components'
import { Grid, Box, Avatar, TextField, withTheme } from '@material-ui/core'
import { People } from '@material-ui/icons'

const ContactItem = ({ theme, id, name, address, phoneNumber, email, handleDelete, edit, setEdit, handleEdit, contact, handleChange, errors }) => {
    return (
        <Wrapper theme={theme}>
            <Operations>
                <Avatar>
                    <People />
                </Avatar>
            </Operations>
            <StyledBox>
                <Title>Name</Title>
                {
                    !edit
                        ? <Content>{name}</Content>
                        : <TextField
                            name='name'
                            value={contact.name}
                            variant='outlined'
                            size='small'
                            onChange={handleChange}
                            error={errors.name}
                            required
                        />
                }
            </StyledBox>
            <StyledBox>
                <Title>Address</Title>

                {
                    !edit
                        ? <Content>{address}</Content>
                        : <TextField
                            name='address'
                            value={contact.address}
                            variant='outlined'
                            size='small'
                            onChange={handleChange}
                            error={errors.address}
                            required
                        />
                }
            </StyledBox>
            <StyledBox>
                <Title>Phone Number</Title>
                {
                    !edit
                        ? <Content>{phoneNumber}</Content>
                        : <TextField
                            name='phoneNumber'
                            value={contact.phoneNumber}
                            variant='outlined'
                            size='small'
                            onChange={handleChange}
                            error={errors.phoneNumber}
                            required
                        />
                }
            </StyledBox>
            <StyledBox>
                <Title>Email</Title>
                {
                    !edit
                        ? <Content>{email}</Content>
                        : <TextField
                            name='email'
                            value={contact.email}
                            variant='outlined'
                            size='small'
                            onChange={handleChange}
                            error={errors.email}
                            required
                        />
                }
            </StyledBox>
            <Operations>
                <Action onClick={() => handleEdit(id)}>{edit ? 'Save' : 'Edit'}</Action>
                {
                    !edit
                        ? <Action onClick={() => handleDelete(id)}>Remove</Action>
                        : <Action onClick={() => setEdit(false)}>Cancel</Action>
                }
            </Operations>
        </Wrapper>
    )
}

export default withTheme(ContactItem)

const Wrapper = styled(Grid)`
    height:100%;
    width:100%;
    padding:.2rem 0;
    margin-bottom:1rem;
    border: solid .1rem rgba(0,0,0,.1);
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap:.3rem;
    ${props=> props.theme.breakpoints.down('md')}{
        grid-template-columns: 1fr;
        padding: .5rem;
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
const Content = styled.span`
    font-size: 1rem;
`
const Operations = styled(Box)`
    display: flex;
    align-items:center;
    justify-content: center;
    gap:1rem;
`
const Action = styled.span`
    font-size: .8rem;
    color: rgba(0,0,0,.3);
    cursor: pointer;
    text-decoration: underline;
`
