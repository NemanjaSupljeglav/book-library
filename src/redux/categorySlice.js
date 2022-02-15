// IMPORTS
import axios from "axios";
//import { NotificationManager } from "react-notifications";

//import i18n from "i18next";

var URL = require("../../package.json").url;

//TYPES
//GET
const GET_ALL_CATEGORY_REQ = "auth/GET_ALL_CATEGORY_REQ";

const GET_ALL_CATEGORY_SCS = "auth/GET_ALL_CATEGORY_SCS";

const GET_ALL_CATEGORY_FLR = "auth/GET_ALL_CATEGORY_FLR";

//ADD

const ADD_CATEGORY_REQ = "auth/ADD_CATEGORY_REQ";

const ADD_CATEGORY_SCS = "auth/ADD_CATEGORY_SCS";

const ADD_CATEGORY_FLR = "auth/ADD_CATEGORY_FLR";

//ACTION GET

export const getAllCategory = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CATEGORY_REQ });

  const getFunc = async () => {
    return axios
      .get(`${URL}/category`)

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
      type: GET_ALL_CATEGORY_SCS,
      payload: { data: response.data, total: response.total },
    });
    //NotificationManager.success(i18n.t(response.status.description));
  } else {
    dispatch({ type: GET_ALL_CATEGORY_FLR });
    //NotificationManager.error(i18n.t(response.status.description));
  }
};

//ACTION ADD

export const addCategory = (dataCategory) => async (dispatch) => {
  dispatch({ type: ADD_CATEGORY_REQ });

  const addFunc = async () => {
    return fetch(`${URL}/category`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(dataCategory),
    });
  };

  const response = await addFunc();

  if (response.status.errorCode === 200) {
    dispatch({
      type: ADD_CATEGORY_SCS,

      payload: response.data,
    });

    //dispatch({ type: VALIDATION_CLEAR });

    //NotificationManager.success(i18n.t(response.status.description));
  } else {
    // eslint-disable-next-line no-lonely-if

    if (typeof response.status.description === "string") {
      //NotificationManager.error(i18n.t(response.status.description));

      dispatch({ type: ADD_CATEGORY_FLR });

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
  addCategory: null,
};

export function categoryReducer(state = INIT_STATE, action = {}) {
  switch (action.type) {
    case GET_ALL_CATEGORY_REQ:
    default:
      return {
        ...state,

        loading: true,

        data: state.data,

        total: state.total,
      };

    case GET_ALL_CATEGORY_SCS:
      return {
        ...state,

        loading: false,

        data: action.payload.data,

        total: action.payload.total,
      };

    case GET_ALL_CATEGORY_FLR:
      return {
        ...state,

        loading: false,

        data: state.data,

        total: state.total,
      };
    case ADD_CATEGORY_REQ:
      return {
        ...state,

        loading: true,

        addCategory: state.addCategory,
      };

    case ADD_CATEGORY_SCS:
      return {
        ...state,

        loading: false,

        addCategory: action.payload,

        data: [...state.data, action.payload],
      };

    case ADD_CATEGORY_FLR:
      return {
        ...state,

        loading: false,

        addCategory: state.addCategory,
      };
  }
}
