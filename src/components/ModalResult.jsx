import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Button from "./UI/Button/Button";

const ModalResult = ({ modalOpen, setModalOpen, pathData }) => {
  const message = (() => {
    switch (pathData.pathLength) {
      case -1:
        if (pathData.startCell === null) return "No Start";
        if (pathData.finishCell === null) return "No Finish";
        return "No way";
      default:
        return `Длина пути: ${pathData.pathLength}, Время выполнения: ${pathData.time} мс.`;
    }
  })();

  return (
    <div>
      {modalOpen && (
        <div className='fixed top-0 left-0 w-full h-full z-[1000] flex justify-center items-center bg-black bg-opacity-50'>
          <div className='relative max-w-2xl w-11/12 bg-slate-100 my-0 mx-auto flex flex-col justify-center items-center py-6 px-8 rounded-xl'>
            <h1 className='text-3xl text-center font-bold'>Result</h1>

            <button
              className='absolute top-2 right-2 hover:scale-105 hover:text-red-500 transition-all duration-300'
              onClick={() => setModalOpen(false)}>
              <AiFillCloseCircle size={28} />
            </button>

            {pathData.pathLength === -1 ? (
              <div className='flex flex-col'>
                <p>{message}</p>
              </div>
            ) : (
              <div className='flex flex-col'>
                <p>Length = {pathData.pathLength}</p>
                <p>Time = {pathData.time}</p>
              </div>
            )}

            <Button variant='primary' onClick={() => setModalOpen(false)}>
              Show Route
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalResult;
