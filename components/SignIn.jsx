import React from 'react';
import { signInWithGoogle } from '../public/firebaseAuth';
import { getCurrentUser } from '../public/firebaseAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function SignInButton() {
  const router = useRouter();
  const handleSignIn = () => {
    signInWithGoogle()
      .then((user) => {
        router.push('/principal');
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <button onClick={()=>handleSignIn()}>
      Iniciar sesión con Google
    </button>
  );
}

export default SignInButton;
