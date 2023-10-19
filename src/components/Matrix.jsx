import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import nextId from "react-id-generator";
import createPath from "../utils/createPath";
import ButtonsSection from "./ButtonsSection";
import ModalResult from "./ModalResult";

const defaultMatrix = {
  rows: 20,
  cols: 20,
};

const pathData = {
  pathLength: 0,
  time: 0,
  startCell: null,
  finishCell: null,
};

const Matrix = () => {
  const initialCells = Array.from({ length: defaultMatrix.rows }, () =>
    Array(defaultMatrix.cols).fill(0)
  );

  const saveMatrixToLocalStorage = (matrix) => {
    const matrixJSON = JSON.stringify(matrix);
    window.localStorage.setItem("matrix-path", matrixJSON);
  };

  const [cells, setCells] = useState(initialCells);
  const [modalOpen, setModalOpen] = useState(false);

  const [isStartCell, setIsStartCell] = useState(false);
  const [isFinishCell, setIsFinishCell] = useState(false);
  const [isBarrierCell, setIsBarrierCell] = useState(false);

  useEffect(() => {
    const storedMatrix = window.localStorage.getItem("matrix-path");
    if (storedMatrix) {
      const parsedMatrix = JSON.parse(storedMatrix);
      setCells(parsedMatrix);
    }
  }, []);

  const handleCellClick = (row, col) => {
    let updatedCells = [...cells];
    if (isStartCell) {
      updatedCells = updatedCells.map((row) => {
        return row.map((value) => (value === 2 ? 0 : value));
      });
      updatedCells[row][col] = 2;
      pathData.startCell = updatedCells[row][col];
    }
    if (isFinishCell) {
      updatedCells = updatedCells.map((row) => {
        return row.map((value) => (value === 3 ? 0 : value));
      });
      updatedCells[row][col] = 3;
      pathData.finishCell = updatedCells[row][col];
    }
    if (isBarrierCell) {
      updatedCells[row][col] =
        cells[row][col] === 0 ? 1 : cells[row][col] === 4 ? 1 : 0;
    }
    setCells(updatedCells);
    saveMatrixToLocalStorage(updatedCells);
  };

  const handleStartClick = () => {
    setIsStartCell((prevStart) => !prevStart);

    if (isFinishCell) setIsFinishCell((prevFinish) => !prevFinish);
    if (isBarrierCell) setIsBarrierCell((prevBarrier) => !prevBarrier);
  };

  const handleFinishClick = () => {
    setIsFinishCell((prevFinish) => !prevFinish);

    if (isStartCell) setIsStartCell((prevStart) => !prevStart);
    if (isBarrierCell) setIsBarrierCell((prevBarrier) => !prevBarrier);
  };

  const handleBarrierClick = () => {
    setIsBarrierCell((prevBarrier) => !prevBarrier);

    if (isStartCell) setIsStartCell((prevStart) => !prevStart);
    if (isFinishCell) setIsFinishCell((prevFinish) => !prevFinish);
  };

  const handleClearField = () => {
    let updatedCells = [...cells];
    updatedCells = updatedCells.map((row) => {
      return row.map((value) => 0);
    });
    setCells(updatedCells);
    saveMatrixToLocalStorage(updatedCells);
  };

  const clearPath = () => {
    const updatedCells = cells.map((row) => {
      return row.map((value) => (value === 4 ? 0 : value));
    });
    setCells(updatedCells);
    saveMatrixToLocalStorage(updatedCells);
    return updatedCells;
  };

  const drawPath = () => {
    const updatedCells = clearPath();

    const path = createPath(updatedCells);

    pathData.pathLength = path.length;
    const pathCells = path.path;
    pathData.time = path.time;

    const pathCellsWithoutEndPoints = pathCells;
    pathCellsWithoutEndPoints.shift();
    pathCellsWithoutEndPoints.pop();

    // Обновляем значения на пути
    pathCellsWithoutEndPoints.forEach((cell) => {
      const [row, col] = cell;
      updatedCells[row][col] = 4;
    });

    // Обновляем состояние
    setCells([...updatedCells]);

    setModalOpen(true);
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-center text-3xl font-bold mt-3'>Shortest path</h1>

      <div className='grid grid-cols-20 gap-0 max-w-lg mx-auto'>
        {cells.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Cell
              key={nextId()}
              value={value}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>

      <ButtonsSection
        isStartCell={isStartCell}
        isFinishCell={isFinishCell}
        isBarrierCell={isBarrierCell}
        handleStartClick={handleStartClick}
        handleFinishClick={handleFinishClick}
        handleBarrierClick={handleBarrierClick}
        handleClearField={handleClearField}
        clearPath={clearPath}
        drawPath={drawPath}
      />

      <ModalResult
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        pathData={pathData}
      />
    </div>
  );
};

export default Matrix;
