import { useState, useRef } from 'react';

export const useFormData = (validationMap = {}, cb) => {
    const [valuesMap, setValuesMap] = useState({});
    const [errorsMap, setErrorsMap] = useState({});
    const [progress, setProgress] = useState(0);

    const el = useRef();

    const changeHandler = ({ target: { name, value } }) => {
        setValuesMap(prevState => ({ ...prevState, [name]: value }))
    }

    const focusHandler = ({ target }) => {
        //setErrorsMap(prevState => ({ ...prevState, [name]: null }));
        el.current = target
    }

    const blurHandler = ({ target: { name, value } }) => {
        if (typeof validationMap[name] !== 'function') return;
        setErrorsMap(prevState => ({ 
            ...prevState, 
            [name]: validationMap[name](value, valuesMap) 
        }));
        setProgress(Object.keys(errorsMap).filter(value => value === true).length)
    }

    const submitHandler = e => {
        e.preventDefault();
        blurHandler(el.current);
        if (progress < Object.keys(validationMap).length) return;
        cb(valuesMap)
    }

    return Object.freeze({
        valuesMap, errorsMap, changeHandler, focusHandler, blurHandler, submitHandler 
    })
} 