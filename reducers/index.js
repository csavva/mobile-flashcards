import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

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
        case ADD_CARD:
            const { title , card } = action
            return {
                ...state,
                [title]: {
                    ...state[title],
                    noOfCards: state[title].noOfCards + 1,
                    questions : state[title].questions.concat(card)
                }
            }        
        default :
            return state
    }
}

export default decks