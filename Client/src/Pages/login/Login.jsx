import { SignIn } from '@clerk/clerk-react';
import React from 'react'
import './login.css'
const Login = () => {
  return (
    <div className='login-container'>
      <SignIn signUpUrl='/signUp' forceRedirectUrl={'/dashboard/'} />
    </div>
  );
}

export default Login