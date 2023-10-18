import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import Button from "../components/UI/Button/Button";
import nextId from "react-id-generator";
import { useDispatch, useSelector } from "react-redux";
import {
  addStart,
  addFinish,
  addBarriers,
  clearField,
} from "../features/cellsSlice";

const defaultMatrix = {
  rows: 20,
  cols: 20,
};

const Matrix = () => {
  const allCells = useSelector((state) => state.cells.cells);
  console.log(allCells);

  const [isStartCell, setIsStartCell] = useState(false);
  const [isFinishCell, setIsFinishCell] = useState(false);
  const [isBarrierCell, setIsBarrierCell] = useState(false);

  const dispatch = useDispatch();

  const initialCells = Array.from({ length: defaultMatrix.rows }, () =>
    Array(defaultMatrix.cols).fill(0)
  );

  useEffect(() => {
    console.log("Something is happening in store");
  }, [dispatch]);

  const [cells, setCells] = useState(initialCells);

  const handleCellClick = (row, col) => {
    let updatedCells = [...cells];
    if (isStartCell) {
      updatedCells = updatedCells.map((row) => {
        return row.map((value) => (value === 2 ? 0 : value));
      });
      updatedCells[row][col] = 2;
    }
    if (isFinishCell) {
      updatedCells = updatedCells.map((row) => {
        return row.map((value) => (value === 3 ? 0 : value));
      });
      updatedCells[row][col] = 3;
    }
    if (isBarrierCell) {
      updatedCells[row][col] = cells[row][col] === 0 ? 1 : 0;
      dispatch(addBarriers({ row, col }));
    }
    setCells(updatedCells);
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
    dispatch(clearField());
  };

  const drawPath = () => {};

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-center text-3xl font-bold mt-3'>Matrix</h1>

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
    </div>
  );
};

export default Matrix;
