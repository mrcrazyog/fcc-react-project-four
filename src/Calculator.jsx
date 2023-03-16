import React, { useState, useEffect } from 'react';
import Display from './Display';
import CalculatorButton from './CalculatorButton';

function Calculator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [currentOperation, setCurrentOperation] = useState('');
  const [operatorPressed, setOperatorPressed] = useState(false);
  const [lastAction, setLastAction] = useState('');
  const [intermediateValue, setIntermediateValue] = useState('');
  const [decimalPressed, setDecimalPressed] = useState(false);
  const [operatorBeforeNegative, setOperatorBeforeNegative] = useState('');
  //   console.log(currentOperation, 'current operation');

  const digits = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
  };

  useEffect(() => {
    console.log('The current operation is', currentOperation);
  }, [currentOperation]);

  const handleNumberClick = (digit) => {
    if (input === '' && digit === '0') {
      setInput('');
    } else {
      if (lastAction === 'negative' && operatorBeforeNegative) {
        setInput('-' + digit);
        handleOperationClick(operatorBeforeNegative);
      } else {
        setInput(input + digit);
      }
      setLastAction('number');
    }
    setOperatorPressed(false);
  };

  const handleOperationClick = (operator) => {
    if (operatorPressed && operator !== '-') {
      setCurrentOperation(operator);
      setOperatorBeforeNegative('');
      return;
    }

    if (operator === '-' && (lastAction === 'operator' || input === '')) {
      if (lastAction === 'negative') {
        setLastAction('operator');
        setInput('');
      } else {
        setLastAction('negative');
        setOperatorBeforeNegative(currentOperation);
      }
      setOperatorPressed(true);
      return;
    }

    if (input && lastAction === 'number') {
      if (
        intermediateValue !== 0 &&
        (lastAction === 'number' || lastAction === 'equals')
      ) {
        let newResult = handleEqualsClick(input, intermediateValue);
        setIntermediateValue(newResult);
      } else {
        setIntermediateValue(parseFloat(input));
      }
    } else if (lastAction === 'negative') {
      setCurrentOperation(operatorBeforeNegative);
    } else if (lastAction === 'equals') {
      setIntermediateValue(output);
    }

    setInput('');
    setCurrentOperation(operator);
    setDecimalPressed(false);
    setLastAction('operator');
    setOperatorPressed(true);
  };

  const handleClearClick = () => {
    setOutput('');
    setInput('');
    setCurrentOperation('');
    setLastAction('');
    setIntermediateValue('');
    setDecimalPressed(false);
    setLastAction('clear');
  };

  const handleDecimalClick = () => {
    setLastAction('decimal');
    if (!decimalPressed) {
      setDecimalPressed(true);
      let originalNumber = input;
      let originalWithDecimal = originalNumber.toString() + '.';
      setInput(originalWithDecimal);
    } else {
      return input;
    }
  };

  const handleEqualsClick = (inputValue, currentIntermediateValue) => {
    const currentInputValue = parseFloat(inputValue);

    let newResult;
    switch (currentOperation) {
      case '+':
        newResult = currentIntermediateValue + currentInputValue;
        break;
      case '-':
        newResult = currentIntermediateValue - currentInputValue;
        break;
      case '*':
        newResult = currentIntermediateValue * currentInputValue;
        break;
      case '/':
        newResult = currentIntermediateValue / currentInputValue;
        break;
      default:
        newResult = currentInputValue;
    }

    setOutput(newResult);
    setInput('');
    setLastAction('equals');

    return newResult;
  };

  return (
    <div>
      <Display value={input || output || '0'} />

      {Object.entries(digits).map(([key, value]) => (
        <CalculatorButton
          key={key}
          text={key}
          id={value}
          onClick={() => handleNumberClick(key)}
        />
      ))}
      <CalculatorButton
        text='+'
        id='add'
        onClick={() => handleOperationClick('+')}
      />
      <CalculatorButton
        text='-'
        id='subtract'
        onClick={() => handleOperationClick('-')}
      />
      <CalculatorButton
        text='*'
        id='multiply'
        onClick={() => handleOperationClick('*')}
      />
      <CalculatorButton
        text='/'
        id='divide'
        onClick={() => handleOperationClick('/')}
      />
      <CalculatorButton
        text='C'
        id='clear'
        onClick={() => handleClearClick()}
      />
      <CalculatorButton
        text='.'
        id='decimal'
        onClick={() => handleDecimalClick()}
      />
      <CalculatorButton
        text='='
        id='equals'
        onClick={() => handleEqualsClick(input, intermediateValue)}
      />
    </div>
  );
}

export default Calculator;
