import api from "../../backend";

// SignUp the user
export const userSignUp = (userData) => async (dispatch) => {
  dispatch({
    type: "USER_SIGN_UP",
    payload: userData,
  });
};

// Login the user
export const userLogin = (userData) => async (dispatch) => {
  console.log("User login action", userData);

  dispatch({ type: "USER_LOG_IN", payload: userData });
};

// get the user details
export const getUser = () => async (dispatch) => {
  const response = await api.post("auth/get-user-details");
  console.log(response);

  if (response.data.success === 1) {
    dispatch({
      type: "GET_USER_DETAILS",
      payload: response,
    });
  } else {
    dispatch({ type: "USER_LOG_OUT" });
  }
};

// logOut the user
export const userLogOut = () => async (dispatch) => {
  const response = await api.post("auth/logout");
  console.log(response);
  dispatch({ type: "USER_LOG_OUT" });
};
