import React, { Component } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { gray, orange } from '../utils/colors'
import TextButton from './TextButton'

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
            <TextButton onPress={() => navigation.navigate("Add Card", { deckId: deck.title })} text={'Add Card'} />
            <TextButton onPress={() => navigation.navigate("Quiz", { deckId: deck.title })} text={'Start Quiz'} color={orange}/>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
  },
  cards: {
      height: 40,
      margin: 12,
      textAlign: 'center',
      color: gray,
  },
  title: {
    fontSize: 40,
    textAlign: 'center'
  }
})

const mapStateToProps = (state, { route }) => {
    const { deckTitle } = route.params
    const deck = state[deckTitle]
  
    return {
      deck,
    }
}

export default connect(mapStateToProps)(Deck)