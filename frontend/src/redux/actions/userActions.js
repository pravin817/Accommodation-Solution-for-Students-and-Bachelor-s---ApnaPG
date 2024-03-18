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
// export const getUser = () => async (dispatch) => {
//   const response = await api.post("auth/get-user-details");
//   console.log(response.data);

//   if (response.data.success === 1) {
//     dispatch({
//       type: "GET_USER_DETAILS",
//       payload: response.data.user_details,
//     });
//   } else {
//     dispatch({ type: "USER_LOG_OUT" });
//   }
// };

export const getUser = () => async (dispatch, getState) => {
  const { user } = getState().user;

  if (user) {
    return;
  }

  try {
    const response = await api.post(`/auth/get-user-details`);
    console.log(response.data, "GET USER DETAILS");

    if (response.data.success === 1) {
      dispatch({
        type: "GET_USER_DETAILS",
        payload: response.data.user_details,
      });
    } else {
      dispatch({ type: "USER_LOG_OUT" });
    }
  } catch (error) {
    console.log(error);
  }
};

// logOut the user
export const userLogOut = () => async (dispatch) => {
  const response = await api.post("auth/logout");
  console.log(response);
  dispatch({ type: "USER_LOG_OUT" });
};
