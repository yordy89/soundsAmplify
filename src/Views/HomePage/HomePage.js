import React from 'react'
import styled from 'styled-components'
import Contact from 'Component/Contact'

const HomePage = () => {
    return (
        <Wrapper>
            <Contact/>
        </Wrapper>
    )
}

export default HomePage

const Wrapper = styled.div`
    width:100%;
    height: 100vh;
    display:flex;
    justify-content: center;
    align-items: center;
`
