import React from 'react';
import Button from 'react-bootstrap/Button';

function CalculatorButton({ text, id, onClick, className }) {
  return (
    <div>
      <div className={className}>
        <Button variant='primary' size='lg' id={id} onClick={onClick}>
          {text}
        </Button>
      </div>
    </div>
  );
}

export default CalculatorButton;
