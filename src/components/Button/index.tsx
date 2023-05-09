import React from 'react'
import { ThreeDots } from "react-loader-spinner";
import styles from './style.module.css';

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    loading?: boolean
}

function Button(props: ButtonProps) {
    const { loading, className, disabled, children, ...rest } = props;
    return (
        <button
            className={`${styles.button} ${className}`}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? (
                <div className="d-flex justify-content-center">
                    <ThreeDots
                        height="20"
                        width="40"
                        radius="9"
                        color="#FFFFFF"
                        ariaLabel="three-dots-loading"
                        visible
                    />
                </div>
            ) : (
                children
            )}
        </button>
    )
}

export default Button