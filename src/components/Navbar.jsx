import React from "react";

const Navbar = () => {
  return (
    <div className='flex items-center justify-around py-4 px-5 text-lg font-bold bg-green-600 cursor-pointer'>
      <p>Start</p>
      <p>Finish</p>
      <p>Barriers</p>
      <p>Start again</p>
      <p>Create path</p>
    </div>
  );
};

export default Navbar;
