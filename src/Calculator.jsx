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
  const [pendingOperator, setPendingOperator] = useState('');
  const [applyNegative, setApplyNegative] = useState(false);

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

  const handleNumberClick = (digit) => {
    if (input === '' && digit === '0') {
      setInput('');
    } else {
      if (applyNegative) {
        setInput('-' + digit);
        setApplyNegative(false);
      } else {
        setInput(input + digit);
      }
      setLastAction('number');
    }
    setOperatorPressed(false);
    setPendingOperator('');
  };

  const handleNegativeClick = () => {
    if (lastAction !== 'negative') {
      handleOperationClick('-');
    }
  };

  const handleOperationClick = (operator) => {
    if (operatorPressed && operator !== '-') {
      setPendingOperator(operator);
      return;
    }

    if (operator === '-' && (lastAction === 'operator' || input === '')) {
      if (lastAction === 'negative') {
        setLastAction('operator');
        setApplyNegative(false);
        setOperatorPressed(true);
        return;
      } else {
        setLastAction('negative');
        setOperatorBeforeNegative(pendingOperator || currentOperation);
        setPendingOperator('');
        setApplyNegative(true);
        return;
      }
    }

    if (applyNegative && input) {
      setInput('-' + input);
      setApplyNegative(false);
    }

    if (intermediateValue !== 0 && input) {
      let newResult = handleEqualsClick(input, intermediateValue);
      setIntermediateValue(newResult);
      setInput('');
    } else if (input) {
      setIntermediateValue(parseFloat(input));
      setInput('');
    } else if (lastAction === 'equals') {
      setIntermediateValue(output);
    }

    setCurrentOperation(operator);
    setDecimalPressed(false);
    setLastAction('operator');
    setOperatorPressed(false);
    setPendingOperator(operator);
    if (lastAction === 'negative') {
      setApplyNegative(false);
    }
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

    setApplyNegative(false);

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
        onClick={() => handleNegativeClick()}
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
