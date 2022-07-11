import { useState } from 'react';
// use auth from firebase any time you want to interact with the authentication
import { projectAuth } from '../firebase.config';
import { useAuthContext } from './useAuthContext';

// custom hook
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, name) => {
    setError(null);
    //   this just means that we are starting something and its loading
    setIsPending(true);

    try {
      // signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(res.user);

      // if connection is bad or response doesnt return
      if (!res) {
        throw new Error('Could not complete signup');
      }

      // update the name of the user
      // add display name to user
      await res.user.updateProfile({ name });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      setIsPending(false);
      setError(null);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
