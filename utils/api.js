import AsyncStorage from '@react-native-async-storage/async-storage'

const DECKS_STORAGE_KEY = '@MobileFlashcardsDecks'

export async function getDeck(title) {
    try{
        const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
        if (decks != null) {
            return JSON.parse(decks)[title]
        }
    }catch(error) {
        console.warn(error);
     }
};

export async function fetchDecks() {
    try {
        const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
        if (decks != null) {
            return decks
        }
    }catch(error){
        console.warn(error)
    }
}

export async function submitDeck(title) {
    try {
        const deckSubmitted = AsyncStorage.mergeItem(DECKS_STORAGE_KEY,  JSON.stringify({
            [title]: {
                title,
                questions: [],
                noOfCards: 0
            }
        }))
        
        if ( deckSubmitted != null) {
            return deckSubmitted
        }
    }catch(error){
        console.warn(error)
    }
    
}

export async function addCard(title, card) {
    
    try{
        const deck = await getDeck(title)

        if (deck != null) {
            return AsyncStorage.mergeItem(
                DECKS_STORAGE_KEY,
                JSON.stringify({
                    [title]: {
                    questions: deck.questions.concat(card),
                    },
                })
            )
        }
    }catch(error) {
        console.warn(error);
     }
    
}
