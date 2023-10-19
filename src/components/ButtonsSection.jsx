import React from "react";
import Button from "./UI/Button/Button";

const ButtonsSection = ({
  isStartCell,
  isFinishCell,
  isBarrierCell,
  handleStartClick,
  handleFinishClick,
  handleBarrierClick,
  handleClearField,
  drawPath,
}) => {
  return (
    <div className='flex flex-row flex-wrap items-center justify-center gap-4 max-w-lg'>
      <Button
        variant='primary'
        isPressed={isStartCell}
        onClick={handleStartClick}>
        Set Start
      </Button>
      <Button
        variant='primary'
        isPressed={isFinishCell}
        onClick={handleFinishClick}>
        Set Finish
      </Button>
      <Button
        variant='primary'
        isPressed={isBarrierCell}
        onClick={handleBarrierClick}>
        Set Barrier
      </Button>
      <Button variant='primary' onClick={handleClearField}>
        Clear All
      </Button>
      <Button variant='primary' onClick={drawPath}>
        Create path
      </Button>
    </div>
  );
};

export default ButtonsSection;