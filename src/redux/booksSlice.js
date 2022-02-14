// IMPORTS
import axios from "axios";
//import { NotificationManager } from "react-notifications";

//import i18n from "i18next";

var URL = require("../../package.json").url;

//TYPES
//GET
const GET_ALL_BOOKS_REQ = "auth/GET_ALL_BOOKS_REQ";

const GET_ALL_BOOKS_SCS = "auth/GET_ALL_BOOKS_SCS";

const GET_ALL_BOOKS_FLR = "auth/GET_ALL_BOOKS_FLR";

//ADD

const ADD_BOOK_REQ = "auth/ADD_BOOK_REQ";

const ADD_BOOK_SCS = "auth/ADD_BOOK_SCS";

const ADD_BOOK_FLR = "auth/ADD_BOOK_FLR";

//ACTION GET

export const getAllBooks = () => async (dispatch) => {
  dispatch({ type: GET_ALL_BOOKS_REQ });

  const getFunc = async () => {
    return axios
      .get(`${URL}/book`)

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
      type: GET_ALL_BOOKS_SCS,
      payload: { data: response.data, total: response.total },
    });
    //NotificationManager.success(i18n.t(response.status.description));
  } else {
    dispatch({ type: GET_ALL_BOOKS_FLR });
    //NotificationManager.error(i18n.t(response.status.description));
  }
};

//ACTION ADD

export const addBook = (body, handleOpen) => async (dispatch) => {
  dispatch({ type: ADD_BOOK_REQ });

  const addFunc = async () => {
    console.log("uslo u add fun");
    const dataAddBook = {
      name: "Traktor tom",
      tagline: "Djecija knjiga o partizanima",
      category_id: 3,
      author_id: 5,
      short_desc:
        "Lijepa stara knjiga o partizanima o složnosti djece i nekim povjesnim desavaanjima",
    };
    return fetch(`${URL}/book`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(dataAddBook),
    });
  };

  const response = await addFunc();

  if (response.status.errorCode === 200) {
    dispatch({
      type: ADD_BOOK_SCS,

      payload: response.data,
    });

    //dispatch({ type: VALIDATION_CLEAR });

    handleOpen();

    //NotificationManager.success(i18n.t(response.status.description));
  } else {
    // eslint-disable-next-line no-lonely-if

    if (typeof response.status.description === "string") {
      //NotificationManager.error(i18n.t(response.status.description));

      dispatch({ type: ADD_BOOK_FLR });

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
  addBooks: null,
};

export function bookReducer(state = INIT_STATE, action = {}) {
  switch (action.type) {
    case GET_ALL_BOOKS_REQ:
    default:
      return {
        ...state,

        loading: true,

        data: state.data,

        total: state.total,
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

        total: state.total,
      };
    case ADD_BOOK_REQ:
      return {
        ...state,

        loading: true,

        addBooks: state.addBooks,
      };

    case ADD_BOOK_SCS:
      return {
        ...state,

        loading: false,

        addBooks: action.payload,

        data: [...state.data, action.payload],
      };

    case ADD_BOOK_FLR:
      return {
        ...state,

        loading: false,

        addBooks: state.addBooks,
      };
  }
}
