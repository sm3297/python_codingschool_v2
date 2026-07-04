import { useState } from 'react';

export default function QuizCard({ quizzes }) {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const handleAnswer = (qIndex, optIndex) => {
    if (answers[qIndex] !== undefined) return;

    const isCorrect = quizzes[qIndex].answer === optIndex;
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
              if (answers[qIndex] !== undefined) {
                optClass += ' disabled';
                if (optIndex === quiz.answer) {
                  optClass += ' correct';
                } else if (optIndex === answers[qIndex] && answers[qIndex] !== quiz.answer) {
                  optClass += ' wrong';
                }
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
