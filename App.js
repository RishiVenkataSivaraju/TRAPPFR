// import React, { useState ,useEffect} from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
// import axios from 'axios';

// const QuizApp = () => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [showAnswer, setShowAnswer] = useState(false);

//   const question = "What is the capital of France?";
//   const options = ["Berlin", "Madrid", "Paris", "Rome"];
//   const correctOption = 2;
//   const explanation = "Paris is the capital city of France.";

//   const handleOptionPress = (index) => {
//     setSelectedOption(index);
//   };

//   const handleSubmit = async() => {
//     setShowAnswer(true);
//   };

//   const handleShowAnswer = () => {
//     setShowAnswer(true);
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {

//         const response = await axios.get(`http://localhost:8080/api/mcq/questions`);
//         console.log(response.data)

//       } catch (error) {
//         console.log("Error fetching user details:", error);
//       }
//     };

//     fetchData();

//     return () => {
//       setUserData(null);
//     };
//   }, []);


//   return (
//     <View style={styles.container}>
//       <Text style={styles.question}>{question}</Text>
//       {options.map((option, index) => (
//         <TouchableOpacity
//           key={index}
//           style={[
//             styles.optionButton,
//             selectedOption === index && !showAnswer && styles.selectedOption,
//             showAnswer && index === correctOption && styles.correctOption,
//             showAnswer && selectedOption === index && selectedOption !== correctOption && styles.incorrectOption,
//           ]}
//           onPress={() => handleOptionPress(index)}
//           disabled={showAnswer}
//         >
//           <Text style={styles.optionText}>{option}</Text>
//         </TouchableOpacity>
//       ))}
//       <View style={styles.buttonContainer}>
//         <Button title="Submit" onPress={handleSubmit} disabled={showAnswer} />
//       </View>
//       <View style={styles.buttonContainer}>
//         <Button title="Show Answer" onPress={handleShowAnswer} />
//       </View>
//       {showAnswer && (
//         <View style={styles.explanationContainer}>
//           <Text style={styles.explanationTitle}>Explanation:</Text>
//           <Text style={styles.explanationText}>{explanation}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   question: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   optionButton: {
//     backgroundColor: '#f0f0f0',
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 5,
//     marginHorizontal: 10, // Margin added to left and right
//   },
//   optionText: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   selectedOption: {
//     backgroundColor: 'purple', // Color for selected option
//   },
//   correctOption: {
//     backgroundColor: 'green',
//   },
//   incorrectOption: {
//     backgroundColor: 'red',
//   },
//   buttonContainer: {
//     marginVertical: 10,
//     marginHorizontal: 10, // Margin added to left and right for buttons
//   },
//   explanationContainer: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//   },
//   explanationTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   explanationText: {
//     fontSize: 16,
//     marginTop: 5,
//   },
// });

// export default QuizApp;  
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/mcq/questions');
        setQuestions(response.data);
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
    setCurrentQuestionIndex(currentQuestionIndex + 1);
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
    marginHorizontal: 10, // Margin added to left and right for options
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  selectedOption: {
    backgroundColor: 'purple', // Color for selected option
  },
  correctOption: {
    backgroundColor: 'green',
  },
  incorrectOption: {
    backgroundColor: 'red',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10, // Margin added to left and right for buttons
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
    color: '#000', // Adjust color as needed
  },
  correctText: {
    color: 'green', // Color for correct message
  },
  incorrectText: {
    color: 'red', // Color for incorrect message
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default QuizApp;
