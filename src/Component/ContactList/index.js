import React from 'react'
import ContactList from './ContactList'
import { useSelector } from 'react-redux'

const Container = () => {
    const contactList = useSelector(state => state.contacts.contacts)
    return (
        <ContactList
            contactList={contactList}
        />
    )
}

export default Container
