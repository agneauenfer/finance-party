import React, { useState, useMemo } from "react";
import testData from "../../data/test.json";
import "./test.css";

function calculateResult(answers) {
  const counts = { A: 0, B: 0, C: 0 };

  answers.forEach((answer) => {
    if (counts[answer] !== undefined) {
      counts[answer] += 1;
    }
  });

  const maxCount = Math.max(counts.A, counts.B, counts.C);

  const topLetters = Object.entries(counts)
    .filter(([_, count]) => count === maxCount)
    .map(([letter]) => letter);

  // Приоритет при ничьей: B (баланс) > A (совместный) > C (индивидуализм)
  const priority = ["B", "A", "C"];
  const resultLetter =
    priority.find((letter) => topLetters.includes(letter)) || topLetters[0];

  return { resultLetter, counts, topLetters };
}

const { title, description, instruction, questions, results, conclusion } = testData;

export default function Test() {
  const totalQuestions = questions.length;

  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const currentQuestion = step > 0 && step <= totalQuestions ? questions[step - 1] : null;

  const progress = useMemo(() => {
    if (step === 0) return 0;
    if (step > totalQuestions) return 100;
    return ((step - 1) / totalQuestions) * 100;
  }, [step, totalQuestions]);

  const handleSelect = (letter) => {
    setSelected(letter);
  };

  const handleNext = () => {
    if (selected === null) return;

    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

    if (step < totalQuestions) {
      setStep(step + 1);
    } else {
      setStep(totalQuestions + 1);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setSelected(null);
  };

  const handleStart = () => {
    setStep(1);
  };

  if (step > totalQuestions) {
    const { resultLetter, counts, topLetters } = calculateResult(answers);
    const result = results[resultLetter];
    const isTie = topLetters.length > 1;

    return (
      <section className="test">
        <div className="test__container">
          <h1 className="test__title title">{title}</h1>

          <div className="test__result">
            <div className="test__result-badge">
              <span className="test__result-letter">{resultLetter}</span>
              <span className="test__result-name subtitle">{result.title}</span>
            </div>

            {isTie && (
              <div className="test__tie-note note">
                У вас одинаковое количество ответов:{" "}
                {topLetters.map((l) => `«${l}»`).join(" и ")} ({counts[topLetters[0]]} каждый)
              </div>
            )}

            <div className="test__stats">
              <div className="test__stat">
                <span className="test__stat-label text-sm">А (Совместный)</span>
                <div className="test__stat-bar">
                  <div
                    className="test__stat-fill test__stat-fill--a"
                    style={{ width: `${(counts.A / totalQuestions) * 100}%` }}
                  />
                </div>
                <span className="test__stat-count text-sm">{counts.A}</span>
              </div>
              <div className="test__stat">
                <span className="test__stat-label text-sm">Б (Баланс)</span>
                <div className="test__stat-bar">
                  <div
                    className="test__stat-fill test__stat-fill--b"
                    style={{ width: `${(counts.B / totalQuestions) * 100}%` }}
                  />
                </div>
                <span className="test__stat-count text-sm">{counts.B}</span>
              </div>
              <div className="test__stat">
                <span className="test__stat-label text-sm">В (Индивидуализм)</span>
                <div className="test__stat-bar">
                  <div
                    className="test__stat-fill test__stat-fill--c"
                    style={{ width: `${(counts.C / totalQuestions) * 100}%` }}
                  />
                </div>
                <span className="test__stat-count text-sm">{counts.C}</span>
              </div>
            </div>

            <div className="test__result-section">
              <h3 className="subtitle primary">Описание</h3>
              <p className="text-base black">{result.description}</p>
            </div>

            <div className="test__result-section">
              <h3 className="subtitle primary">Совместимость</h3>
              <p className="text-base black">{result.compatibility}</p>
            </div>

            <div className="test__result-section test__result-section--advice">
              <h3 className="subtitle primary">Совет</h3>
              <p className="text-base black">{result.advice}</p>
            </div>

            <p className="test__conclusion text-base black">{conclusion}</p>

            <button className="test__btn test__btn--primary" onClick={handleRestart}>
              Пройти тест заново
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ===================== ВОПРОС =====================
  if (step > 0 && currentQuestion) {
    return (
      <section className="test">
        <div className="test__container">
          <div className="test__progress">
            <div className="test__progress-bar">
              <div
                className="test__progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="test__progress-text text-sm">
              Вопрос {step} из {totalQuestions}
            </span>
          </div>

          <h2 className="test__question subtitle primary">{currentQuestion.text}</h2>

          <div className="test__options">
            {currentQuestion.options.map((option) => (
              <button
                key={option.letter}
                className={`test__option ${selected === option.letter ? "test__option--selected" : ""}`}
                onClick={() => handleSelect(option.letter)}
              >
                <span className="test__option-letter">{option.letter}</span>
                <span className="test__option-text text-base black">{option.text}</span>
              </button>
            ))}
          </div>

          <button
            className="test__btn test__btn--primary"
            onClick={handleNext}
            disabled={selected === null}
          >
            {step === totalQuestions ? "Узнать результат" : "Следующий вопрос"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="test">
      <div className="test__container">
        <h1 className="test__title title">{title}</h1>
        <p className="test__description text-base black">{description}</p>
        <p className="test__instruction text-base black">{instruction}</p>
        <button className="test__btn test__btn--primary" onClick={handleStart}>
          Начать тест
        </button>
      </div>
    </section>
  );
}