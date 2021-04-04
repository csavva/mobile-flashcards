import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput} from 'react-native'
import { connect } from 'react-redux'
import { blue, gray, orange, pink, purple } from '../utils/colors'
import { setLocalNotification, clearLocalNotification} from '../utils/notification'
import TextButton from './TextButton'

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
                    <Text style={styles.score}>
                        This deck has no cards
                    </Text>
                </View>
            )
        }

        if (endOfQuiz) {
            return (
                <View style={styles.container}>
                    <Text style={styles.score} >
                        You scored: {'\n'} {correctAnswers/totalNoOfQuestions * 100}%
                    </Text>
                    <TextButton onPress={() => this.resetQuiz()} text={'Restart Quiz'} color={purple}/>
                    <TextButton onPress={() => navigation.navigate("Deck", { deckTitle: route.params.deckId })} text={'Back to Deck'} color={gray}/>
                </View>                
            )
        }
        
        return (
            <View style={styles.container}>
                <Text style={styles.questionCounter}>
                    {currentQuestion + 1}/{totalNoOfQuestions}
                </Text>
                {showAnswer ? 
                    <Text style={styles.answer}>{questions[currentQuestion].answer}</Text>
                    : <Text style={styles.question}>{questions[currentQuestion].question}</Text>
                    }
                <TouchableOpacity onPress={() => this.setState({ showAnswer: !this.state.showAnswer})}>
                    <Text style={styles.answerToggle}>{showAnswer ? 'Question' : 'Answer'}</Text>
                </TouchableOpacity>
                <TextButton onPress={() => this.handleAnswer('correctAnswers')} text={'Correct'} color={blue}/>
                <TextButton onPress={() => this.handleAnswer('incorrectAnswers')} text={'Incorrect'} color={pink}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 20,
    },   
    question: {
        fontSize: 32,
    },
    score: {
        fontSize: 50,
        margin: 30,
        textAlign: 'center',
    },
    answer: {
        fontSize: 32,
        color: gray,
    },
    questionCounter: {
        color: gray,
        fontSize: 20,
        textAlign: 'left',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 40,
    },
    answerToggle: {
        color: orange,
        marginTop: 30,
    }
})

const mapStateToProps = (state, { route }) => {
    const { deckId } = route.params
  
    return {
        deckId,
        questions: state[deckId].questions,
    }
}


export default connect(mapStateToProps)(Quiz)