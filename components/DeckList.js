import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import { connect } from 'react-redux'
import AppLoading from 'expo-app-loading'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import { gray } from '../utils/colors'

class DeckList extends Component {
    state = {
        ready: false,
    }
    
    componentDidMount () {
      const { dispatch } = this.props
  
      fetchDecks()
        .then((decks) => dispatch(receiveDecks(decks)))
        .then(() => this.setState(() => ({ready: true})))
    }
  
    renderItem = ({ item }) => (
      
      <View style={styles.item}>
        <TouchableOpacity 
          onPress={()=> this.props.navigation.navigate('Deck', { deckTitle: item.title })}
          >
          <Text style={styles.title}>{item.title}</Text> 
          <Text style={styles.noOfCards}>{item.noOfCards} Cards</Text> 
        </TouchableOpacity>
      </View>
    )
  
    onDeckPress = (deck) => {
      this.setState({
        selectedDeck: deck.title
      })
    };
  
    renderEmptyList() {
      
      return (
        <View>
            <Text style={styles.noDataText}>
                You didn't create any decks of flashcards.{'\n'}
                Go ahead and add some!
            </Text>
        </View>
      )
    }

    render() {
      const { decks } = this.props
      const { ready } = this.state
      if (ready === false) {
          return <AppLoading />
      }
  
      return (
          <View style={styles.container}>
            {Object.keys(decks).length === 0
              ? this.renderEmptyList()
              : <FlatList 
                    data={Object.values(decks)}
                    renderItem={this.renderItem} 
                    keyExtractor={item => item.title}
                >
                </FlatList>
            }
            
          </View>
      )
    }
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    item: {
      padding: 20,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 17,
      justifyContent: 'center',
    },
    noDataText: {
      fontSize: 28,
      paddingTop: 80,
      paddingBottom: 80,
      textAlign: 'center'
    },
    title: {
      fontSize: 32,
    },
    noOfCards: {
      marginTop: 12,
      fontSize: 16,
      color: gray
    },
})


function mapStateToProps (decks) {
    return {
      decks
    }
  }
  
  export default connect(mapStateToProps)(DeckList)