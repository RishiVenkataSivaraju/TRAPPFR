import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.131:8080/api/mcq/questions');
        setQuestions(response.data);
        setCurrentQuestionIndex(response.data.length - 1); // Set to last index
      } catch (error) {
        console.log("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []);

  const handleOptionPress = (index) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const { answer } = currentQuestion;
    const selectedAnswer = `option${selectedOption + 1}`;

    if (selectedAnswer === answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setCorrectAnswer(answer);
    }
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setCorrectAnswer('');
    setCurrentQuestionIndex(currentQuestionIndex - 1); // Decrement index
  };

  const currentQuestion = questions[currentQuestionIndex];
  const { question, option1, option2, option3, option4, explanation, answer } = currentQuestion || {};

  return (
    <View style={styles.container}>
      {currentQuestion ? (
        <>
          <Text style={styles.question}>{question}</Text>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === 0 && !showAnswer && styles.selectedOption,
              showAnswer && answer === 'option1' && styles.correctOption,
              showAnswer && selectedOption === 0 && selectedOption !== 0 && styles.incorrectOption,
            ]}
            onPress={() => handleOptionPress(0)}
            disabled={showAnswer}
          >
            <Text style={styles.optionText}>{option1}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === 1 && !showAnswer && styles.selectedOption,
              showAnswer && answer === 'option2' && styles.correctOption,
              showAnswer && selectedOption === 1 && selectedOption !== 1 && styles.incorrectOption,
            ]}
            onPress={() => handleOptionPress(1)}
            disabled={showAnswer}
          >
            <Text style={styles.optionText}>{option2}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === 2 && !showAnswer && styles.selectedOption,
              showAnswer && answer === 'option3' && styles.correctOption,
              showAnswer && selectedOption === 2 && selectedOption !== 2 && styles.incorrectOption,
            ]}
            onPress={() => handleOptionPress(2)}
            disabled={showAnswer}
          >
            <Text style={styles.optionText}>{option3}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === 3 && !showAnswer && styles.selectedOption,
              showAnswer && answer === 'option4' && styles.correctOption,
              showAnswer && selectedOption === 3 && selectedOption !== 3 && styles.incorrectOption,
            ]}
            onPress={() => handleOptionPress(3)}
            disabled={showAnswer}
          >
            <Text style={styles.optionText}>{option4}</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} disabled={showAnswer} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="See Answer" onPress={() => setShowAnswer(true)} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Next Question" onPress={handleNextQuestion} />
          </View>
          {showAnswer && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>Explanation:</Text>
              <Text style={styles.explanationText}>{explanation}</Text>
            </View>
          )}
          {showAnswer && isCorrect !== null && (
            <View style={styles.resultContainer}>
              <Text style={[styles.resultText, isCorrect ? styles.correctText : styles.incorrectText]}>
                {isCorrect ? 'Correct! Well done!' : `Incorrect. The correct answer is ${correctAnswer}.`}
              </Text>
            </View>
          )}
        </>
      ) : (
        <Text style={styles.loadingText}>Loading questions...</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 30,
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  selectedOption: {
    backgroundColor: 'purple',
  },
  correctOption: {
    backgroundColor: 'green',
  },
  incorrectOption: {
    backgroundColor: 'red',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 30,
    borderCurve: 10
  },
  explanationContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  explanationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  explanationText: {
    fontSize: 16,
    marginTop: 5,
  },
  resultContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  correctText: {
    color: 'green',
  },
  incorrectText: {
    color: 'red',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default QuizApp;
