import React, { useState } from "react";
import Cell from "./Cell";
import nextId from "react-id-generator";

const Matrix = () => {
  const [matrix, setMatrix] = useState(generateMatrix());

  function generateMatrix() {
    const matrix = [];
    for (var i = 0; i < 10; i++) {
      const row = [];
      for (var j = 0; j < 10; j++) {
        row.push(
          <Cell
            key={nextId()}
            x={j}
            y={i}
            isStart={false}
            isFinish={false}
            isBlocked={false}
          />
        );
      }
      matrix.push(row);
    }
    return matrix;
  }

  return (
    <div className='grid grid-cols-10 gap-0 max-w-sm ml-[420px] mt-[120px]'>
      {matrix}
    </div>
  );
};

export default Matrix;
