import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput} from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
    state = {
    }

    render() {
        const { deck, navigation } = this.props;
        console.log(deck)
        return (
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.deckTitle}>{deck.title}</Text>
              <Text style={styles.cards}>{deck.questions.length} Cards</Text>
            </View>
            {/* <TextButton
              text="Add Card"
              onPress={() => navigation.navigate("AddCard", { deckId: deck.title })}
            />
            <TextButton
              text="Start Quiz"
              onPress={() => navigation.navigate("Quiz", { deckId: deck.title })}
            /> */}
          </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    title: {
        fontSize: 32,
    },
})

const mapStateToProps = (state, { route }) => {
    const { deckTitle } = route.params
    const deck = state[deckTitle]
  
    return {
      deck,
    }
}

export default connect(mapStateToProps)(Deck)