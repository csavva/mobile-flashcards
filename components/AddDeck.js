import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput} from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import TextButton from './TextButton'

function SubmitBtn ({ onPress }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>Create Deck</Text>
      </TouchableOpacity>
    )
}


class AddDeck extends Component {
    state = {
        title: '',
    }

    handleTextChange = (title) =>{
        this.setState({ title })
    }

    handleSubmit = () => {
        const { title } = this.state

        if (title === '') {
            alert("Please enter a name for this new deck")
            return;
        }

        const { dispatch, navigation } = this.props
        

        dispatch(addDeck(title))
        navigation.navigate("Deck", { deckTitle: title })

        this.setState({ title: '' })
        
    }
    
    render() {
        const { title } = this.state
    
        return (
            <View style={styles.container}>
              <Text style={styles.title}>What is the title of your new deck?</Text>
              <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={this.handleTextChange}
                    placeholder="Deck Title"
                />
                <TextButton onPress={this.handleSubmit} text={'Create Deck'}/>
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
    input: {
        height: 44,
        marginTop: 50,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'stretch'
    },
    title: {
        fontSize: 40,
        textAlign: 'center'
    }
})


export default connect()(AddDeck)