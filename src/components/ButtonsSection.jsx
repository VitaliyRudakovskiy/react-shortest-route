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
  clearPath,
  drawPath,
}) => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-4 mb-3">
      {/* Кнопка для установки точки старта */}
      <Button
        variant="primary"
        isPressed={isStartCell}
        onClick={handleStartClick}
      >
        Set Start
      </Button>

      {/* Кнопка для установки точки финиша */}
      <Button
        variant="primary"
        isPressed={isFinishCell}
        onClick={handleFinishClick}
      >
        Set Finish
      </Button>

      {/* Кнопка для установки барьера */}
      <Button
        variant="primary"
        isPressed={isBarrierCell}
        onClick={handleBarrierClick}
      >
        Set Barrier
      </Button>

      {/* Кнопка для очистки всей матрицы */}
      <Button variant="danger" onClick={handleClearField}>
        Clear All
      </Button>

      {/* Кнопка для очистки построенного пути */}
      <Button variant="danger" onClick={clearPath}>
        Clear Path
      </Button>

      {/* Кнопка для построения пути между стартом и финишем */}
      <Button variant="main" onClick={drawPath}>
        Create path
      </Button>
    </div>
  );
};

export default ButtonsSection;
