import React, { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [errors, setErrors] = useState({});

    const pushError = (context, error) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            const contextErrors = newErrors[context] || [];
            newErrors[context] = [...contextErrors, error];
            return newErrors;
        });
    };

    const putError = (context, error) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            newErrors[context] = [error];
            return newErrors;
        });
    }

    const clearErrors = (context) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors }
            delete newErrors[context]
            return newErrors;
        });
    };

    const clearAllErrors = () => {
        setErrors({});
    };

    const getAllErrors = () => {
        const sortedKeys = Object.keys(errors).sort();
        return sortedKeys.flatMap((context) => errors[context]);
    };

    return (
        <ErrorContext.Provider value={{ errors, pushError, putError, getAllErrors, clearErrors, clearAllErrors }}>
            {children}
        </ErrorContext.Provider>
    );
};

// Custom Hook to Use the Error Context
export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useError must be used within an ErrorProvider");
    }
    return context;
};
