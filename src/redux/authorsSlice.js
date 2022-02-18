// IMPORTS
import axios from "axios";
//import { NotificationManager } from "react-notifications";

//import i18n from "i18next";

var URL = require("../../package.json").url;

//TYPES

//GET
const GET_ALL_AUTHOR_REQ = "auth/GET_ALL_AUTHOR_REQ";

const GET_ALL_AUTHOR_SCS = "auth/GET_ALL_AUTHOR_SCS";

const GET_ALL_AUTHOR_FLR = "auth/GET_ALL_AUTHOR_FLR";

//ADD

const ADD_AUTHOR_REQ = "auth/ADD_AUTHOR_REQ";

const ADD_AUTHOR_SCS = "auth/ADD_AUTHOR_SCS";

const ADD_AUTHOR_FLR = "auth/ADD_AUTHOR_FLR";

//ACTION GET

export const getAllAuthor = () => async (dispatch) => {
  dispatch({ type: GET_ALL_AUTHOR_REQ });

  const getFunc = async () => {
    return axios
      .get(`${URL}/author`)

      .then((response) => {
        //checkToken();

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
      type: GET_ALL_AUTHOR_SCS,
      payload: { data: response.data, total: response.total },
    });
    //NotificationManager.success(i18n.t(response.status.description));
  } else {
    dispatch({ type: GET_ALL_AUTHOR_FLR });
    //NotificationManager.error(i18n.t(response.status.description));
  }
};

//ACTION ADD

export const addAuthor = (dataAuthor) => async (dispatch) => {
  dispatch({ type: ADD_AUTHOR_REQ });

  const addFunc = async () => {
    return axios
      .post(`${URL}/author`, {
        name: dataAuthor.name,
        about: dataAuthor.about,
      })

      .then((response) => {
        //checkToken();
        return response;
      })

      .catch((error) => {
        //checkToken();
        return console.log(error.message);
      });
  };

  const response = await addFunc();
  if (response.data.status === 201) {
    dispatch({
      type: ADD_AUTHOR_SCS,

      payload: response.data.data,
    });

    //dispatch({ type: VALIDATION_CLEAR });

    //NotificationManager.success(i18n.t(response.status.description));
  } else {
    // eslint-disable-next-line no-lonely-if

    if (typeof response.status.description === "string") {
      //NotificationManager.error(i18n.t(response.status.description));

      dispatch({ type: ADD_AUTHOR_FLR });

      //dispatch({ type: VALIDATION_CLEAR });
    } else {
      //dispatch({ type: VALIDATION_MESSAGE, message: response.status });
    }
  }
};

/**

 * REDUCERS

 */

const INIT_STATE = {
  loading: false,
  data: [],
  total: 0,
  addAuthor: null,
};

export function authorReducer(state = INIT_STATE, action = {}) {
  switch (action.type) {
    case GET_ALL_AUTHOR_REQ:
    default:
      return {
        ...state,

        loading: true,

        data: state.data,

        total: state.total,
      };

    case GET_ALL_AUTHOR_SCS:
      return {
        ...state,

        loading: false,

        data: action.payload.data,

        total: action.payload.total,
      };

    case GET_ALL_AUTHOR_FLR:
      return {
        ...state,

        loading: false,

        data: state.data,

        total: state.total,
      };
    case ADD_AUTHOR_REQ:
      return {
        ...state,

        loading: true,

        addAuthor: state.addAuthor,
      };

    case ADD_AUTHOR_SCS:
      return {
        ...state,

        loading: false,

        addAuthor: action.payload,

        data: [...state.data, action.payload],
      };

    case ADD_AUTHOR_FLR:
      return {
        ...state,

        loading: false,

        addAuthor: state.addAuthor,
      };
  }
}
