import { Children, createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  // useReducer has 2 arguments, a reducer function, and an initial state
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {/* children is the App */}
      {/* now every component can access this context */}
      {children}
    </AuthContext.Provider>
  );
};
