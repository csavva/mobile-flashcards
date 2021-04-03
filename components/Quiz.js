import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput} from 'react-native'
import { connect } from 'react-redux'

class Quiz extends Component {
    state = {
        currentQuestion: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        showAnswer: false,
    }

    handleAnswer = (userAnswer) => {
        this.setState({
            showAnswer: false,
            [userAnswer]: this.state[userAnswer] + 1
        })

        const { currentQuestion, showAnswer } = this.state
        const { questions } = this.props

        const totalNoOfQuestions = questions.length
        
        if (currentQuestion < totalNoOfQuestions - 1){
            this.setState({
                currentQuestion: currentQuestion + 1,
            })
        }else {
            this.setState({
                currentQuestion: 0,
                correctAnswers: 0,
                incorrectAnswers: 0,
                showAnswer: false,
              });
        }
    }
    

    render() {
        const { currentQuestion, showAnswer } = this.state
        const { questions } = this.props

        const totalNoOfQuestions = questions.length
        
        if (totalNoOfQuestions === 0) {
            return (
                <View style={styles.container}>
                    <Text>
                        This deck has no cards
                    </Text>
                </View>
            )
        }
        
        return (
            <View style={styles.container}>
                <Text>
                    {currentQuestion + 1}/{totalNoOfQuestions}
                </Text>
                {showAnswer ? 
                    <Text style={styles.title}>{questions[currentQuestion].answer}</Text>
                    : <Text style={styles.title}>{questions[currentQuestion].question}</Text>
                    }
                <TouchableOpacity onPress={() => this.setState({ showAnswer: !this.state.showAnswer})}>
                    <Text>Show {showAnswer ? 'Question' : 'Answer'}</Text>
                </TouchableOpacity>            
                <TouchableOpacity onPress={() => this.handleAnswer('correctAnswers')}>
                    <Text>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleAnswer('incorrectAnswers')}>
                    <Text>Incorrect</Text>
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
    const { deckId } = route.params
    console.log(deckId)
  
    return {
        deckId,
        questions: state[deckId].questions,
    }
}


export default connect(mapStateToProps)(Quiz)