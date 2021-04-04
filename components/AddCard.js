import React, { Component } from 'react'
import { View, StyleSheet, TextInput} from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { lightPurp } from '../utils/colors'
import TextButton from './TextButton'

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
                <TextButton onPress={this.handleSubmit} text={'Submit'} color={lightPurp}/>
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
        marginBottom: 50,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'stretch'
    },
    title: {
        fontSize: 32,
    },
})


export default connect()(AddCard)