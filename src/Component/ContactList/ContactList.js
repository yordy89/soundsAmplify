import React from 'react'
import styled from 'styled-components'
import ContactItem from './ContactItem'

const ContactList = ({ contactList }) =>
    <Wrapper>
        {
            contactList.map(c =>
                <ContactItem
                    key={c._id}
                    id={c._id}
                    name={c.name}
                    address={c.address}
                    phoneNumber={c.phoneNumber}
                    email={c.email}
                />
            )
        }
    </Wrapper>

export default ContactList

const Wrapper = styled.div`
    width:100%;
`