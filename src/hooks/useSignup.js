import { useState, useEffect } from 'react';
// use auth from firebase any time you want to interact with the authentication
import { projectAuth } from '../firebase.config';
import { useAuthContext } from './useAuthContext';

// custom hook
export const useSignup = () => {
  const [isCancelled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
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
      await res.user.updateProfile({ displayName });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCanceled(true);
    };
  }, []);

  return { signup, error, isPending };
};
