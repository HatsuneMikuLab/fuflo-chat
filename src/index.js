import React from 'react';
import ReactDOM from 'react-dom';

import "./index.css";

import { SmartForm } from './components/smart-form/SmartForm'

ReactDOM.render(
  <React.StrictMode>
    <SmartForm title = "Sign Up">
      <input 
        type = "email" name = "email" data-label = "Email" data-icon = "GoMail" 
        data-validate = { value => !value ? 'Email is required field.' 
          : !/\S+@\S+\.\S+/g.test(value) ? `${value} is not a valid email.` : true } 
      />
      <input 
        type = "text" name = "nickname" data-label = "Nickname" data-icon = "GoPerson"  
        data-validate = { value => !value ? `Nickname is required field` 
          : value.length < 2 ? 'Nickname should be 2 characters or longer' : true } 
      />
      <input 
        type = "password" name = "password" data-label = "Password" data-icon = "GoKey"  
        data-validate = { value => !value ? 'Password is required field'
          : value.length < 10 ?  'Password should be 10 characters or longer'
          : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(value) 
          ? 'Password should contain at least one uppercase , one lowercase letter and number'
          : true } 
      />
      <input 
        type = "password" name = "passwordRepeat" data-label = "Repeat password" data-icon = "GoKey"  
        data-validate = { (value, { password }) => password !== value ? 'Password does not match' : true } 
      />
    </SmartForm>
  </React.StrictMode>,
  document.getElementById('root')
)


