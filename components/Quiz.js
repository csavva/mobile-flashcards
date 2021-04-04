import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput} from 'react-native'
import { connect } from 'react-redux'
import { setLocalNotification, clearLocalNotification} from "../utils/notification"

class Quiz extends Component {
    state = {
        currentQuestion: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        showAnswer: false,
        endOfQuiz: false
    }
    componentDidMount() {
        clearLocalNotification().then(setLocalNotification)
    }

    handleAnswer = (userAnswer) => {
        this.setState({
            showAnswer: false,
            [userAnswer]: this.state[userAnswer] + 1
        })

        const { currentQuestion } = this.state
        const { questions } = this.props

        const totalNoOfQuestions = questions.length
        
        if (currentQuestion < totalNoOfQuestions - 1){
            this.setState({
                currentQuestion: currentQuestion + 1,
            })
        }else {
            this.setState({
                endOfQuiz: true,
              });
        }
    }

    resetQuiz = () => {
        this.setState({
            currentQuestion: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            showAnswer: false,
            endOfQuiz: false
        })        
    }
    

    render() {
        const { currentQuestion, showAnswer, endOfQuiz, correctAnswers } = this.state
        const { questions, navigation, route } = this.props

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

        if (endOfQuiz) {
            return (
                <View style={styles.container}>
                    <Text>
                        You scored: {correctAnswers/totalNoOfQuestions * 100}%
                    </Text>
                    <TouchableOpacity onPress={() => this.resetQuiz()}>
                        <Text>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Deck", { deckTitle: route.params.deckId })}>
                        <Text>Back to Deck</Text>
                    </TouchableOpacity>
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
  
    return {
        deckId,
        questions: state[deckId].questions,
    }
}


export default connect(mapStateToProps)(Quiz)