import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { useDispatch } from 'react-redux'
import { setContacts } from 'Store/reducer'

const Container = () => {
    const [chips, setChips] = useState([])
    const [value, setValue] = useState('')
    const dispatch = useDispatch()

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            setChips([...chips, { id: Math.random() * 10000, text: e.target.value }])
            setValue('')
        }
    }

    const onDelete = (id) => {
        setChips(chips.filter(chip => chip.id !== id))
    }

    const onClick = () => {
        findContacts()
    }

    const findContacts = () => {
        fetch(`${process.env.REACT_APP_API_URL}/contact/search`, {
            method: 'Post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(chips)
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                dispatch(setContacts(res))
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        findContacts()
    }, [chips])

    return (
        <NavBar
            onDelete={onDelete}
            onChange={onChange}
            onKeyPress={onKeyPress}
            onClick={onClick}
            chips={chips}
            value={value}
        />
    )
}

export default Container
