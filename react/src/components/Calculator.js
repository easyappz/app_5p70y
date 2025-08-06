import React, { useState } from 'react';
import '../styles/Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      // Prevent multiple decimal points
      if (value === '.' && display.includes('.')) {
        return;
      }
      setDisplay(display + value);
    }
    setWaitingForSecondValue(false);
  };

  const handleOperationClick = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondValue(true);
    setDisplay('0');
  };

  const calculateResult = () => {
    if (!previousValue || !operation) return;

    const currentValue = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = previousValue + currentValue;
        break;
      case '-':
        result = previousValue - currentValue;
        break;
      case '×':
        result = previousValue * currentValue;
        break;
      case '÷':
        if (currentValue === 0) {
          setDisplay('Ошибка');
          return;
        }
        result = previousValue / currentValue;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay((value / 100).toString());
  };

  const handleToggleSign = () => {
    if (display !== '0') {
      setDisplay((parseFloat(display) * -1).toString());
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{display}</div>
      <div className="calculator-buttons">
        <button className="button light-gray" onClick={handleClear}>AC</button>
        <button className="button light-gray" onClick={handleToggleSign}>±</button>
        <button className="button light-gray" onClick={handlePercentage}>%</button>
        <button className="button orange" onClick={() => handleOperationClick('÷')}>÷</button>

        <button className="button dark-gray" onClick={() => handleNumberClick('7')}>7</button>
        <button className="button dark-gray" onClick={() => handleNumberClick('8')}>8</button>
        <button className="button dark-gray" onClick={() => handleNumberClick('9')}>9</button>
        <button className="button orange" onClick={() => handleOperationClick('×')}>×</button>

        <button className="button dark-gray" onClick={() => handleNumberClick('4')}>4</button>
        <button className="button dark-gray" onClick={() => handleNumberClick('5')}>5</button>
        <button className="button dark-gray" onClick={() => handleNumberClick('6')}>6</button>
        <button className="button orange" onClick={() => handleOperationClick('-')}>-</button>

        <button className="button dark-gray" onClick={() => handleNumberClick('1')}>1</button>
        <button className="button dark-gray" onClick={() => handleNumberClick('2')}>2</button>
        <button className="button dark-gray" onClick={() => handleNumberClick('3')}>3</button>
        <button className="button orange" onClick={() => handleOperationClick('+')}>+</button>

        <button className="button dark-gray zero" onClick={() => handleNumberClick('0')}>0</button>
        <button className="button dark-gray" onClick={() => handleNumberClick('.')}>.</button>
        <button className="button orange equals" onClick={calculateResult}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
