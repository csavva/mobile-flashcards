import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'

export function getDeck(title) {
    const decks = AsyncStorage.getItem(DECKS_STORAGE_KEY)
    return JSON.parse(decks)[title]
}

export function fetchDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export function submitDeck(title) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY,  JSON.stringify({
        [title]: {
            title,
            questions: [],
            noOfCards: 0
        }
    }))
}

export async function addCard(title, card) {
    const deck = await getDeck(title)

    return AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
            [title]: {
            questions: deck.questions.concat(card),
            },
        })
    )
}

export function removeEntry(key) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
        const data = JSON.parse(results)
        data[key] = undefined
        delete data[key]
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })

}
