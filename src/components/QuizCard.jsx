import { useState, useEffect } from 'react';

export default function QuizCard({ quizzes, onAllCorrect, onWrongAnswer }) {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    if (!quizzes || quizzes.length === 0) {
      if (onAllCorrect) onAllCorrect(true);
      return;
    }
    const allCorrect = quizzes.every((_, qIndex) => feedback[qIndex] === true);
    if (onAllCorrect) onAllCorrect(allCorrect);
  }, [feedback, quizzes, onAllCorrect]);

  const handleAnswer = (qIndex, optIndex) => {
    // If already correctly answered, don't allow changing
    if (feedback[qIndex]) return;

    const isCorrect = quizzes[qIndex].answer === optIndex;
    
    // If wrong, and it's a new wrong answer they are selecting
    if (!isCorrect && answers[qIndex] !== optIndex) {
      if (onWrongAnswer) onWrongAnswer();
    }

    setAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
    setFeedback(prev => ({ ...prev, [qIndex]: isCorrect }));
  };

  return (
    <div className="quiz-container">
      {quizzes.map((quiz, qIndex) => (
        <div key={qIndex} className="quiz-item">
          <div className="quiz-question">
            Q{qIndex + 1}. {quiz.question}
          </div>
          <div className="quiz-options">
            {quiz.options.map((option, optIndex) => {
              let optClass = 'quiz-option';
              
              if (feedback[qIndex]) {
                // If this question is already correct
                optClass += ' disabled';
                if (optIndex === quiz.answer) {
                  optClass += ' correct';
                }
              } else if (answers[qIndex] === optIndex && feedback[qIndex] === false) {
                // If they chose this option and it's wrong (but not disabled, they can try again)
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
