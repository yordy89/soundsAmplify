import React from 'react'
import Contact from './Contact'
import useSetContact from 'Hooks/useSetContact'

const Container = () => {
    const { contact, handleChange, handleAdd, errors } = useSetContact()
    
    return (
        <Contact
            handleChange={handleChange}
            handleAdd={handleAdd}
            contact={contact}
            errors={errors}
        />
    )
}

export default Container
