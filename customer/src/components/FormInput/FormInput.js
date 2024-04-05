import { useState } from "react";
import styles from './FormInput.module.scss'
import classNames from "classnames/bind"



const FormInput = (props) => {

    const cx = classNames.bind(styles)
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className={cx("formInput")}>
            <label>{label}</label>
            <input
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                }
                focused={focused.toString()}
            />
            <span>{errorMessage}</span>
        </div>
    );
};

export default FormInput;