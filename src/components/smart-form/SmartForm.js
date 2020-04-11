import React, { useEffect } from 'react';
import * as iconMap from 'react-icons/go';
import { useFormData } from '../../hooks/useFormData';

import './SmartForm.css';

export const SmartForm = ({ children, title }) => {
    const validationMap = {};

    let childNodes = React.Children.toArray(children);
    
    childNodes.forEach( 
        ({ props: { name, ['data-validate']: validate }}) => {
            if (typeof validate === 'function') validationMap[name] = validate;
        }
    );

    const { valueMap, validationResultMap, readyFieldMap, 
    initHandler, changeHandler, focusHandler, blurHandler, submitHandler } = 
        useFormData(validationMap, formData => alert(formData)); 
    
    const fields = childNodes
        .filter(({ type }) => type === 'input' || type === 'button')
        .map((child, i) => {
            const { props: { name, ['data-label']: label, ['data-icon']: icon } } = child;
            return <React.Fragment key = { i }>
                <label>{ label }</label>
                <div className = { `c-input ${typeof validationResultMap[name] === 'string' 
                && readyFieldMap[name] ? 'c-invalid' : 'c-valid'}` }>
                    { iconMap[icon]() } {/* Do you see this bratok? 
                    Each component just a function and we can call it to return JSX*/}
                    { 
                        React.cloneElement(child, {
                            value: valueMap[name] || '',
                            onChange: changeHandler,
                            onFocus: focusHandler,
                            onBlur: blurHandler
                        })
                    }
                    <div className = "c-animation-underline"></div>
                </div>
                <span>{ readyFieldMap[name] ? validationResultMap[name] : '' }</span>
            </React.Fragment>
        });

    useEffect(() => { initHandler() }, []);

    return (
        <div className = "c-form">
            <h2>{ title }</h2>
            <form onSubmit = { submitHandler } noValidate>
                { fields }
                <button type = "submit" className = "c-submit-btn">
                    { iconMap.GoPlug } {/* Probably I should pass it like a prop */}
                    <span>Connect</span>
                </button>
            </form>
        </div>
    )
}