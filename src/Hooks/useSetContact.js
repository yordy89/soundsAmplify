import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addContact, editContact } from 'Store/reducer'

const useSetContact = (name = '', address = '', phoneNumber = 0, email = '') => {
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const [errors, setErrors] = useState({})
    const [contact, setContact] = useState({
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        email: email
    })

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })

    }

    const validations = () => {
        let errors = {}
        errors.name = contact.name ? false : true
        errors.address = contact.address ? false : true
        errors.phoneNumber = contact.phoneNumber ? false : true
        errors.email = contact.email ? false : true
        setErrors({
            ...errors
        })
    }

    useEffect(() => {
        validations()
    }, [contact])

    const isError = () => {
        return errors.name || errors.address || errors.phoneNumber || errors.email
    }

    const handleAdd = () => {
        !isError() &&
            fetch(`${process.env.REACT_APP_API_URL}/contact`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(contact)
            }).then(res => res.json())
                .then(res => {
                    dispatch(addContact(res))
                    setContact({
                        name: '',
                        address: '',
                        phoneNumber: 0,
                        email: ''
                    })
                }).catch(e => console.log(e))

    }

    const handleEdit = (id) => {
        if (!edit) {
            setEdit(true)
        } else {
            !isError() &&
                fetch(`${process.env.REACT_APP_API_URL}/contact/${id}`, {
                    method: 'Put',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(contact)
                }).then(res => res.json())
                    .then(res => {
                        dispatch(editContact(res))
                        setEdit(false)
                    })
                    .catch(e => console.log(e))
        }
    }

    return { contact, handleChange, handleAdd, edit, setEdit, handleEdit, errors }
}

export default useSetContact
