import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ContactItem from './ContactItem'
import { removeContact } from 'Store/reducer'
import useSetContact from 'Hooks/useSetContact'

const Container = ({ id, name, address, phoneNumber, email }) => {
    const {
        contact,
        handleChange,
        handleEdit,
        edit,
        setEdit,
        errors
    } = useSetContact(name, address, phoneNumber, email)
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/contact/${id}`, {
            method: 'Delete',
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(res => res.json())
            .then(res => dispatch(removeContact(res)))
            .catch(e => console.log(e))
    }

    return (
        <Wrapper>
            <ContactItem
                id={id}
                name={name}
                address={address}
                phoneNumber={phoneNumber}
                email={email}
                handleDelete={handleDelete}
                edit={edit}
                setEdit={setEdit}
                contact={contact}
                handleChange={handleChange}
                handleEdit={handleEdit}
                errors={errors}
            />
        </Wrapper>
    )
}
export default Container

const Wrapper = styled.div`
    display:flex;
    justify-content:center;
`
