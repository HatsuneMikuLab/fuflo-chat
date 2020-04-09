import React, { useEffect } from 'react';
import { useFormData } from '../../hooks/useFormData';
import { GoMail, GoPerson, GoKey, GoPlug } from 'react-icons/go';

import './SignUp.css'

export const SignUp = () => {
    const inputMap = {
        email: {
            type: 'email',
            label: 'Email',
            icon: <GoMail />
        },
        nickname: {
            type: 'text',
            label: 'Nickname',
            icon: <GoPerson />
        },
        password: {
            type: 'password',
            label: 'Password',
            icon: <GoKey />
        },
        repeatPassword: {
            type: 'password',
            label: 'Repeat Password',
            icon: <GoKey />
        }
    }

    const { valueMap, validationMap, readyFieldMap, initHandler,
    changeHandler, focusHandler, blurHandler, submitHandler } = useFormData(
        {
            email: value => !value ? 'Email is required field.' 
                : !/\S+@\S+\.\S+/g.test(value) ? `${value} is not a valid email.` : true,
            nickname: value => !value ? `Nickname is required field` 
                : value.length < 2 ? 'Nickname should be 2 characters or longer' : true,
            password: value => !value ? 'Password is required field'
                : value.length < 10 ?  'Password should be 10 characters or longer'
                : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(value) 
                ? 'Password should contain at least one uppercase , one lowercase letter and number'
                : true,
            repeatPassword: (value, { password }) => password !== value ? 'Password does not match' : true 
        },
        formData => window.location.replace('https://developers.google.com/')
    );

    useEffect(() => { initHandler() }, []);

    const inputs = Object.keys(inputMap).map(
        (key, i) => 
        <React.Fragment key = { i }>
            <label>{ inputMap[key].label }</label>
            <div className = { `c-input ${typeof validationMap[key] === 'string' && readyFieldMap[key] ? 'c-invalid' : 'c-valid'}` }>
                { inputMap[key].icon }
                <input 
                    type = { inputMap[key].type }
                    name = { key }
                    value = { valueMap[key] || '' }
                    onChange = { changeHandler }
                    onFocus = { focusHandler }
                    onBlur = { blurHandler }
                />
                <div className = "c-animation-underline"></div>
            </div>
            <span>{ readyFieldMap[key] ? validationMap[key] : '' }</span>
        </React.Fragment>
    );

    return (
        <div className = "c-form">
            <h2>Sign Up</h2>
            <form onSubmit = { submitHandler } noValidate>
                { inputs }
                <button type = "submit" className = "c-submit-btn">
                    <GoPlug />
                    <span>Connect</span>
                </button>
            </form>
        </div>
    )
}
