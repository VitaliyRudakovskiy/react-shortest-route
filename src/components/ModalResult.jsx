import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Button from "./UI/Button/Button";

const ModalResult = ({ modalOpen, setModalOpen, pathData }) => {
  // Сообщение для вывода в случае ошибки в зависимости от типа ошибки
  const message = (() => {
    switch (pathData.pathLength) {
      case -1:
        if (pathData.startCell === null)
          return "You should put start cell first";
        if (pathData.finishCell === null)
          return "You should put finish cell first";
        return "There is no way from start to finish";
      default:
        return `Длина пути: ${pathData.pathLength}, Время выполнения: ${pathData.time} мс.`;
    }
  })();

  return (
    <div>
      {modalOpen && (
        <div className='fixed top-0 left-0 w-full h-full z-[1000] flex justify-center items-center bg-black bg-opacity-50'>
          <div className='relative max-w-lg w-10/12 bg-slate-100 my-0 mx-auto flex flex-col justify-center items-center py-6 px-8 rounded-xl'>
            <h1 className='text-3xl text-center font-bold mb-4'>Result</h1>

            {/* Кнопка закрытия окна */}
            <button
              className='absolute top-2 right-2 hover:scale-105 hover:text-red-500 transition-all duration-300'
              onClick={() => setModalOpen(false)}>
              <AiFillCloseCircle size={28} />
            </button>

            {/* Вывод сообщения */}
            {pathData.pathLength === -1 ? (
              <div className='flex flex-col'>
                <p className='text-2xl mb-4 text-red-800'>{message}</p>
              </div>
            ) : (
              <div className='flex flex-col'>
                <p className='text-2xl text-center mb-4'>
                  Length = {pathData.pathLength} cells
                </p>
                <p className='text-xl text-center mb-4'>
                  Time = {pathData.time}ms
                </p>
              </div>
            )}

            {/* Кнопка закрытия окна */}
            <Button variant='primary' onClick={() => setModalOpen(false)}>
              Show Matrix
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalResult;
