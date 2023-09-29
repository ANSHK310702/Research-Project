import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import LogIn from './LogIn';

const initialFormState = {
    username: '',
    password: '',
    email: '',
    authCode: '',
    formType: 'signUp'
}

const Authentication = () => {
  
    const [formState, updateFormState] = useState(initialFormState);
    const { formType } = formState



  
}

export default Authentication