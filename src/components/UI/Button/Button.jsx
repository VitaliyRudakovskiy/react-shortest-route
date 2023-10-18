import React from "react";
import "./Button.css";

const buttonTypes = {
  primary: "primary",
  danger: "danger",
};

const Button = ({ children, variant, isPressed, style, ...rest }) => {
  const buttonClass = isPressed
    ? `button button--${buttonTypes[variant]} button--${buttonTypes[variant]}-pressed`
    : `button button--${buttonTypes[variant]}`;

  return (
    <button className={buttonClass} style={style} {...rest}>
      {children}
    </button>
  );
};

export default Button;
