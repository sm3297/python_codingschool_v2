import { useState, useEffect } from 'react';

export default function QuizCard({ quizzes, onAllCorrect, onWrongAnswer }) {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [shuffledQuizzes, setShuffledQuizzes] = useState([]);

  useEffect(() => {
    if (!quizzes || quizzes.length === 0) {
      setShuffledQuizzes([]);
      return;
    }
    const shuffled = quizzes.map(quiz => {
      const optionsWithIndex = quiz.options.map((opt, i) => ({ text: opt, originalIndex: i }));
      for (let i = optionsWithIndex.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
      }
      const newAnswerIndex = optionsWithIndex.findIndex(opt => opt.originalIndex === quiz.answer);
      return {
        ...quiz,
        options: optionsWithIndex.map(opt => opt.text),
        answer: newAnswerIndex
      };
    });
    setShuffledQuizzes(shuffled);
    setAnswers({});
    setFeedback({});
  }, [quizzes]);

  useEffect(() => {
    if (!quizzes || quizzes.length === 0) {
      if (onAllCorrect) onAllCorrect(true);
      return;
    }
    const allCorrect = quizzes.every((_, qIndex) => feedback[qIndex] === true);
    if (onAllCorrect) onAllCorrect(allCorrect);
  }, [feedback, quizzes, onAllCorrect]);

  const handleAnswer = (qIndex, optIndex) => {
    if (feedback[qIndex]) return;

    const isCorrect = shuffledQuizzes[qIndex].answer === optIndex;
    
    if (!isCorrect && answers[qIndex] !== optIndex) {
      if (onWrongAnswer) onWrongAnswer();
    }

    setAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
    setFeedback(prev => ({ ...prev, [qIndex]: isCorrect }));
  };

  return (
    <div className="quiz-container">
      {shuffledQuizzes.map((quiz, qIndex) => (
        <div key={qIndex} className="quiz-item">
          <div className="quiz-question">
            Q{qIndex + 1}. {quiz.question}
          </div>
          <div className="quiz-options">
            {quiz.options.map((option, optIndex) => {
              let optClass = 'quiz-option';
              
              if (feedback[qIndex]) {
                optClass += ' disabled';
                if (optIndex === quiz.answer) {
                  optClass += ' correct';
                }
              } else if (answers[qIndex] === optIndex && feedback[qIndex] === false) {
                optClass += ' wrong';
              }
              
              return (
                <button
                  key={optIndex}
                  className={optClass}
                  onClick={() => handleAnswer(qIndex, optIndex)}
                >
                  {optIndex + 1}) {option}
                </button>
              );
            })}
          </div>
          {feedback[qIndex] !== undefined && (
            <div className={`quiz-feedback ${feedback[qIndex] ? 'correct' : 'wrong'}`}>
              {feedback[qIndex] ? '🎯 정답이에요!' : '🤔 다시 생각해볼까요?'}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
