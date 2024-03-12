import api from "../../backend";

export const userLogin = (userData) => async (dispatch) => {
  console.log("User login action", userData);

  dispatch({ type: "USER_LOG_IN", payload: userData });
};

export const userLogOut = () => async (dispatch) => {
  const response = await api.post("auth/logout");
  console.log(response);
  dispatch({ type: "USER_LOG_OUT" });
};

