import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION } from '../actions'

function decks( state = {} , action) {
    switch ( action.type ) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                [action.title]:{
                    title: action.title,
                    questions: [],
                    noOfCards: 0
                }
            }
        case ADD_QUESTION:
            const { deck , question } = action
            return {
                ...state,
                [deck]: {
                    ...state[deck],
                    question : state[deck].questions.concat(question)
                }
            }        
        default :
            return state
    }
}

export default decks