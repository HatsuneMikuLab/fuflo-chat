import { useState, useEffect } from 'react';

export const useFormData = (validationScheme = {}, cb) => {
    const [valueMap, setValueMap] = useState({});
    const [validationResultMap, setValidationResultMap] = useState({});
    const [readyFieldMap, setReadyFieldMap] = useState({});
    const [progress, setProgress] = useState(0);

    const validate = (name, value) => {
        if (typeof validationScheme[name] !== 'function') return;
        setValidationResultMap(prevState => ({ 
            ...prevState, 
            [name]: validationScheme[name](value, valueMap) 
        }));
    }

    useEffect(() => {
        setProgress(
            Object.keys(validationResultMap)
            .filter(key => validationResultMap[key] === true).length
        )
    }, [validationResultMap]);

    const initHandler = () => {
        Object.keys(validationScheme).forEach(key => validate(key, ''))
    }

    const changeHandler = ({ target: { name, value } }) => {
        setValueMap(prevState => ({ ...prevState, [name]: value }));
        validate(name, value)
    }

    const focusHandler = ({ target: { name } }) => {
        setReadyFieldMap(prevState => ({ ...prevState, [name]: false }))
    }

    const blurHandler = ({ target: { name } }) => {
        setReadyFieldMap(prevState => ({ ...prevState, [name]: true }))
    }

    const submitHandler = e => {
        e.preventDefault();
        console.log(validationResultMap)
        console.log('Progress: ', progress)
        console.log('Schema length: ', Object.keys(validationScheme).length)
        if (progress < Object.keys(validationScheme).length) return;
        cb(valueMap)
    }

    return Object.freeze({
        valueMap, validationResultMap, readyFieldMap, initHandler, 
        changeHandler, focusHandler, blurHandler, submitHandler 
    })
} 