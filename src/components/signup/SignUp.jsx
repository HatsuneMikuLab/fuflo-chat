import React from 'react';
import { useFormData } from '../../hooks/useFormData';

export const SignUp = () => {
    const { valuesMap, errorsMap, changeHandler, focusHandler, blurHandler, submitHandler } = useFormData(
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
        formData => fetch({
            method: 'POST',
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken') }` 
            },
            body: JSON.stringify(formData)
        })
    );

    return (
        <>
            <h2>Sign Up</h2>
            <form onSubmit = { submitHandler }>
                <input 
                    type = 'email'
                    name = 'email'
                    value = { valuesMap.email || '' }
                    onChange = { changeHandler }
                    onFocus = { focusHandler }
                    onBlur = { blurHandler }
                />
                <input 
                    type = 'text'
                    name = 'nickname'
                    value = { valuesMap.nickname || '' }
                    onChange = { changeHandler }
                    onFocus = { focusHandler }
                    onBlur = { blurHandler }
                />
            </form>
        </>
    )
}

