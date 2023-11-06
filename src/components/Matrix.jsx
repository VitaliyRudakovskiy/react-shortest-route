import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import nextId from "react-id-generator";
import createPath from "../utils/createPath";
import ButtonsSection from "./ButtonsSection";
import ModalResult from "./ModalResult";

//исходные координаты матрицы
const defaultMatrix = {
  rows: 20,
  cols: 20,
};

//объект содержит данные для передачи в модальное окно вывода результата
const pathData = {
  pathLength: 0,
  time: 0,
  startCell: null,
  finishCell: null,
};

const Matrix = () => {
  //начальное состояние матрицы
  const initialCells = Array.from({ length: defaultMatrix.rows }, () =>
    Array.from({ length: defaultMatrix.cols }, () => 0)
  );

  //сохранение матрицы в локальном хранилице
  const saveMatrixToLocalStorage = (matrix) => {
    const matrixJSON = JSON.stringify(matrix);
    window.localStorage.setItem("matrix-path", matrixJSON);
  };

  const [cells, setCells] = useState(initialCells);
  //стейт, определяющий, открыто ли модальное окно с результатом
  const [modalOpen, setModalOpen] = useState(false);

  //стейт, определяющий, нажата ли кнопка установки стартовой ячейки
  const [isStartCell, setIsStartCell] = useState(false);
  //стейт, определяющий, нажата ли кнопка установки финишной ячейки
  const [isFinishCell, setIsFinishCell] = useState(false);
  //стейт, определяющий, нажата ли кнопка установки барьера
  const [isBarrierCell, setIsBarrierCell] = useState(false);

  //отображение матрицы из локального хранилища, если она там есть
  useEffect(() => {
    const storedMatrix = window.localStorage.getItem("matrix-path");
    if (storedMatrix) {
      const parsedMatrix = JSON.parse(storedMatrix);
      setCells(parsedMatrix);
    }
  }, []);

  //обработка клика по ячейке
  const handleCellClick = (row, col) => {
    let updatedCells = [...cells];
    if (isStartCell) {
      //стартовая ячейка должна быть только одна
      updatedCells = updatedCells.map((row) => {
        return row.map((value) => (value === 2 ? 0 : value));
      });
      updatedCells[row][col] = 2;
      pathData.startCell = updatedCells[row][col];
    }
    if (isFinishCell) {
      //финишная ячейка должна быть только одна
      updatedCells = updatedCells.map((row) => {
        return row.map((value) => (value === 3 ? 0 : value));
      });
      updatedCells[row][col] = 3;
      pathData.finishCell = updatedCells[row][col];
    }
    if (isBarrierCell) {
      //дополнительный обработчик, ставим ли мы барьер на созданном пути
      updatedCells[row][col] =
        cells[row][col] === 0 ? 1 : cells[row][col] === 4 ? 1 : 0;
    }
    setCells(updatedCells); //обновляем матрицу
    saveMatrixToLocalStorage(updatedCells); //сохраняем в локальное хранилице
  };

  //обработка клика по кнопке Set Start
  const handleStartClick = () => {
    setIsStartCell((prevStart) => !prevStart);

    if (isFinishCell) setIsFinishCell((prevFinish) => !prevFinish);
    if (isBarrierCell) setIsBarrierCell((prevBarrier) => !prevBarrier);
  };

  //обработка клика по кнопке Set Finish
  const handleFinishClick = () => {
    setIsFinishCell((prevFinish) => !prevFinish);

    if (isStartCell) setIsStartCell((prevStart) => !prevStart);
    if (isBarrierCell) setIsBarrierCell((prevBarrier) => !prevBarrier);
  };

  //обработка клика по кнопке Set Barrier
  const handleBarrierClick = () => {
    setIsBarrierCell((prevBarrier) => !prevBarrier);

    if (isStartCell) setIsStartCell((prevStart) => !prevStart);
    if (isFinishCell) setIsFinishCell((prevFinish) => !prevFinish);
  };

  //обработка клика по кнопке Clear All
  const handleClearField = () => {
    let updatedCells = [...cells];
    updatedCells = updatedCells.map((row) => {
      return row.map((value) => 0);
    });
    setCells(updatedCells);
    saveMatrixToLocalStorage(updatedCells);
  };

  //обработка клика по кнопке Clear Path
  const clearPath = () => {
    const updatedCells = cells.map((row) => {
      return row.map((value) => (value === 4 ? 0 : value));
    });
    setCells(updatedCells);
    saveMatrixToLocalStorage(updatedCells);
    return updatedCells;
  };

  //обработка клика по кнопке Create Path
  const drawPath = () => {
    const updatedCells = clearPath(); //очищаем предыдущий маршрут перед тем, как нарисовать новый

    const path = createPath(updatedCells); //находим путь

    pathData.pathLength = path.length;
    const pathCells = path.path;
    pathData.time = path.time;

    //удаляем начальную и конечную ячейку, чтобы на матрице старт и финиш не перекрасились в цвет созданного пути
    pathCells.shift();
    pathCells.pop();

    //обновляем значения на пути
    pathCells.forEach((cell) => {
      const [row, col] = cell;
      updatedCells[row][col] = 4;
    });

    setCells([...updatedCells]); //обновляем состояние
    setModalOpen(true); //выводим окно с результатом
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="text-center text-3xl font-bold mt-4 mb-5">
        This application finds the shortest path between 2 cells
      </h1>

      {/* Для каждого элемента матрицы создаем ячейку */}
      <div className="grid grid-cols-20 gap-0 mb-5">
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
