import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput} from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'

function SubmitBtn ({ onPress }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>Submit</Text>
      </TouchableOpacity>
    )
}


class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }


    handleSubmit = () => {
        const { question, answer } = this.state

        if (question === '' || answer === '') {
            alert("Please both fields for this new card")
            return;
        }

        const { dispatch, route, navigation } = this.props
        const deck = route.params.deckId

        dispatch(addCard(deck, { question, answer }))
        navigation.navigate("Deck", { deckTitle: route.params.deckId })

        this.setState({ question: '' , answer: ''})
        
    }
    
    render() {
        const { question, answer } = this.state
    
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={question}
                    onChangeText={(text) => this.setState({ question: text })}
                    placeholder="Enter question"
                />
                <TextInput
                    style={styles.input}
                    value={answer}
                    onChangeText={(text) => this.setState({ answer: text })}
                    placeholder="Enter answer"
                />
                <SubmitBtn onPress={this.handleSubmit} />
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


export default connect()(AddCard)