// IMPORTS
import axios from "axios";
//import { NotificationManager } from "react-notifications";

//import i18n from "i18next";

//TYPES

const GET_ALL_BOOKS_REQ = "auth/GET_ALL_BOOKS_REQ";

const GET_ALL_BOOKS_SCS = "auth/GET_ALL_BOOKS_SCS";

const GET_ALL_BOOKS_FLR = "auth/GET_ALL_BOOKS_FLR";

//ACTIONS

export const getAllBooks = () => async (dispatch) => {
  dispatch({ type: GET_ALL_BOOKS_REQ });

  const getFunc = async () => {
    return axios
      .get(`http://127.0.0.1:5000/book`)

      .then((response) => {
        //checkToken();
        console.log(response.data);
        return response.data;
      })

      .catch((error) => {
        //checkToken();
        return console.log(error.message);
      });
  };

  const response = await getFunc();

  if (response.status === 200) {
    dispatch({
      type: GET_ALL_BOOKS_SCS,
      payload: { data: response.data, total: response.total },
    });
    console.log(response.data.status);
    //NotificationManager.success(i18n.t(response.status.description));
  } else {
    dispatch({ type: GET_ALL_BOOKS_FLR });
    console.log(response.status);
    //NotificationManager.error(i18n.t(response.status.description));
  }
};

/**

 * REDUCERS

 */

const INIT_STATE = {
  loading: false,
  data: [],
  total: [],
};

export function bookReducer(state = INIT_STATE, action = {}) {
  switch (action.type) {
    case GET_ALL_BOOKS_REQ:
    default:
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
