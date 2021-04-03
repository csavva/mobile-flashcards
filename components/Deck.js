import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
    state = {
    }

    render() {
        const { deck, navigation } = this.props;
        return (
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{deck.title}</Text>
              <Text style={styles.cards}>{deck.questions.length} Cards</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Add Card", { deckId: deck.title })}>
              <Text>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Quiz", { deckId: deck.title })} >
              <Text>Start Quiz</Text>
            </TouchableOpacity>
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