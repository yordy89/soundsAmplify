import { SET_CONTACT, ADD_CONTACT, REMOVE_CONTACT, EDIT_CONTACT } from './actions'

const initialState = {
    contacts: []
}

export default function ContactReducer(state = initialState, actions) {
    switch (actions.type) {
        case SET_CONTACT:
            return { ...state, contacts: actions.payload }
        case ADD_CONTACT:
            return { ...state, contacts: [...state.contacts, actions.payload] }
        case REMOVE_CONTACT:
            return { ...state, contacts: state.contacts.filter(c => c._id !== actions.payload._id) }
        case EDIT_CONTACT:
            return {
                ...state, contacts: state.contacts.map(contact => {
                    if (contact._id === actions.payload._id) {
                        contact = { ...contact, ...actions.payload }
                    }
                    return contact
                })
            }
        default:
            return state
    }
}

export const setContacts = (contacts) => (dispatch) => {
    dispatch({
        type: SET_CONTACT,
        payload: contacts
    })
}

export const addContact = (contact) => (dispatch) => {
    dispatch({
        type: ADD_CONTACT,
        payload: contact
    })
}

export const removeContact = (contact) => (dispatch) => {
    dispatch({
        type: REMOVE_CONTACT,
        payload: contact
    })
}

export const editContact = (contact) => (dispatch) => {
    dispatch({
        type: EDIT_CONTACT,
        payload: contact
    })
}