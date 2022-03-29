export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
  console.log(email, password);
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCmVo4xwjjQBE0LvtYtg4f8hC2yLUNQBso',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('There was a problem with Signup!');
    }

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: SIGNUP,
    });
  };
};

export const login = (email, password) => {
  console.log(email, password);
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmVo4xwjjQBE0LvtYtg4f8hC2yLUNQBso',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('There was a problem with Signup!');
    }

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: LOGIN,
    });
  };
};
