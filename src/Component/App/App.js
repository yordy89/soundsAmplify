import React from 'react'
import HomePage from 'Views/HomePage'
import configureStore from 'Store/store'
import { Provider } from 'react-redux'
import { StylesProvider } from '@material-ui/core'

const store = configureStore()

const App = () =>
    <Provider store={store}>
        <StylesProvider injectFirst>
            <HomePage />
        </StylesProvider>
    </Provider>


export default App


