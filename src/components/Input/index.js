import { forwardRef } from "react";

import styles from "./Input.module.scss";

const Input = forwardRef(({ value, onChange, ...props }, ref) => {
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      className={styles.input}
      {...props}
    />
  );
});

export default Input;
