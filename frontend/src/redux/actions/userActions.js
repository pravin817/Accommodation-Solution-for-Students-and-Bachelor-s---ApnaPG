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
    // console.log(response.data, "GET USER DETAILS");

    if (response.data.success) {
      dispatch({
        type: "GET_USER_DETAILS",
        payload: response.data.user_details,
      });

      // Save the room data from the database
      dispatch({
        type: "SAVE_ROOM_DATA",
        payload: response.data.room_data,
      });
    } else {
      dispatch({ type: "USER_LOG_OUT" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Change the user Role
export const userRole = () => async (dispatch, getState) => {
  const { userDetails } = getState().user;

  if (userDetails?.role === "host") {
    console.log("Already a host");
  }

  try {
    const res = await api.post(`/auth/become-a-host`, { role: "host" });

    console.log(res);

    const currentRoomId = res.data?.room?._id;

    // Save the currentRoomId in localStorage
    if (currentRoomId) {
      JSON.stringify(localStorage.setItem("currentRoomId", currentRoomId));
    }

    if (res.data?.success) {
      dispatch({
        type: "CHANGE_USER_ROLE",
        payload: res.data,
      });

      dispatch({
        type: "CURRENT_NEW_ROOM",
        payload: res.data.room,
      });
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
