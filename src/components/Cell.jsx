import React from "react";

const Cell = ({ x, y, isStart, isFinish, isBlocked }) => {
  return (
    <div className='block w-10 h-10 bg-green-300 border-2 border-black cursor-pointer hover:bg-green-400'></div>
  );
};

export default Cell;
