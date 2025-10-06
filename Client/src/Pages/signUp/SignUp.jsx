import { SignUp } from '@clerk/clerk-react';
import React from 'react'
import './signUp.css'
const Signup = () => {
  return (
    <div className='signup-container'>

      <SignUp signInUrl='/login' forceRedirectUrl={'/dashboard/'}  />
    </div>
  );
}

export default Signup