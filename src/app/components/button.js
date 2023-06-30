"use client";

const Button = ({ type, label, className, onClick }) => {
  return (
    <button
      className={className || ""}
      type={type || "button"}
      onClick={onClick || null}
    >
      {label}
    </button>
  );
};

export default Button;
