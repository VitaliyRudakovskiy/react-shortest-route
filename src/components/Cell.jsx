import React from "react";

//цвет ячейки в зависимости от ее значения
const cellColor = {
  0: "#c1d9f9", //usual cell
  1: "#0a1c34", //barrier cell
  2: "#295409", //start cell
  3: "#df0d21", //finish cell
  4: "#ffff00", //path cell
};

const Cell = ({ value, onClick }) => {
  return (
    <div
      className='flex items-center justify-center w-full min-h-[13px] border-[1px] border-black cursor-pointer select-none'
      onClick={onClick}
      style={{ backgroundColor: cellColor[value] }}></div>
  );
};

export default Cell;
