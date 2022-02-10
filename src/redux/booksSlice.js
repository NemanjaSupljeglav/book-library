// IMPORTS
import axios from "axios";
//import { NotificationManager } from "react-notifications";

//import i18n from "i18next";

//TYPES

const GET_ALL_BOOKS_REQ = "auth/GET_ALL_BOOKS_REQ";

const GET_ALL_BOOKS_SCS = "auth/GET_ALL_BOOKS_SCS";

const GET_ALL_BOOKS_FLR = "auth/GET_ALL_BOOKS_FLR";

//ACTIONS

export const getAllBooks = (body) => async (dispatch) => {
  console.log("doslo u getAllBooks");
  dispatch({ type: GET_ALL_BOOKS_REQ });

  //const response = await postFunc("importporeznaHeadMip/pagination", body);
  const response = () => {
    console.log("uslo u response");
    return axios
      .get("http://127.0.0.1:5000/book", {
        method: "GET",
        headers: {
          //...authHeader(),
        },
      })
      .then((response) => {
        //checkToken();
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        //checkToken();
        console.log(error);
        //return NotificationManager.error(error.message);
      });
  };
  console.log("response.status.errorCode");
  console.log(response.status.errorCode);

  if (response.status.errorCode === 200) {
    dispatch({
      type: GET_ALL_BOOKS_SCS,

      payload: { data: response.data, total: response.total },
    });
    console.log(response.status.description);
    //NotificationManager.success(i18n.t(response.status.description));
  } else {
    dispatch({ type: GET_ALL_BOOKS_FLR });
    console.log(response.status.description);
    //NotificationManager.error(i18n.t(response.status.description));
  }
};

/**

 * REDUCERS

 */

const INIT_STATE = {
  loading: false,

  data: [],
};

export default function reducer(state = INIT_STATE, action = {}) {
  switch (action.type) {
    case GET_ALL_BOOKS_REQ:
      return {
        ...state,

        loading: true,

        data: state.data,
      };

    case GET_ALL_BOOKS_SCS:
      return {
        ...state,

        loading: false,

        data: action.payload.data,

        total: action.payload.total,
      };

    case GET_ALL_BOOKS_FLR:
      return {
        ...state,

        loading: false,

        data: state.data,
      };
  }
}
