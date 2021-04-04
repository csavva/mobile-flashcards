import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList} from 'react-native'
import { connect } from 'react-redux'
import AppLoading from 'expo-app-loading'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'

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
    item: {
        padding: 20,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius:3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,24)',
        shadowOffset: {
            width: 0,
            height: 3,
        }
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    title: {
      fontSize: 32,
    },
    noOfCards: {
      fontSize: 16,
    },
})


function mapStateToProps (decks) {
    return {
      decks
    }
  }
  
  export default connect(mapStateToProps)(DeckList)