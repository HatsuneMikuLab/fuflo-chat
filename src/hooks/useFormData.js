import { useState, useEffect } from 'react';

export const useFormData = (validationScheme = {}, cb) => {
    const [valueMap, setValueMap] = useState({});
    const [validationMap, setValidationMap] = useState({});
    const [readyFieldMap, setReadyFieldMap] = useState({});
    const [progress, setProgress] = useState(0);

    const validate = (name, value) => {
        if (typeof validationScheme[name] !== 'function') return;
        setValidationMap(prevState => ({ 
            ...prevState, 
            [name]: validationScheme[name](value, valueMap) 
        }), );
    }

    useEffect(() => {
        setProgress(
            Object.keys(validationMap)
            .filter(key => validationMap[key] === true).length
        )
    }, [validationMap]);

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
        console.log(validationMap)
        console.log('Progress: ', progress)
        console.log('Schema length: ', Object.keys(validationScheme).length)
        if (progress < Object.keys(validationScheme).length) return;
        cb(valueMap)
    }

    return Object.freeze({
        valueMap, validationMap, readyFieldMap, initHandler, 
        changeHandler, focusHandler, blurHandler, submitHandler 
    })
} 