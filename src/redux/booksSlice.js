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

//Delete

const DELETE_BOOK_REQ = "auth/DELETE_BOOK_REQ";
const DELETE_BOOK_SCS = "auth/DELETE_BOOK_SCS";
const DELETE_BOOK_FLR = "auth/DELETE_BOOK_FLR";

//EDIT

const EDIT_BOOK_REQ = "auth/EDIT_BOOK_REQ";
const EDIT_BOOK_SCS = "auth/EDIT_BOOK_SCS";
const EDIT_BOOK_FLR = "auth/EDIT_BOOK_FLR";

//ONE BOOK

const ONE_BOOK_ADD = "auth/ONE_BOOK_ADD";
const ONE_BOOK_DELETE = "auth/ONE_BOOK_DELETE";
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

export const addBook = (dataBook) => async (dispatch) => {
  dispatch({ type: ADD_BOOK_REQ });

  const addFunc = async () => {
    return axios
      .post(`${URL}/book`, {
        name: dataBook.name,
        tagline: dataBook.tagline,
        category_id: dataBook.category_id,
        author_id: dataBook.author_id,
        short_desc: dataBook.short_desc,
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
      type: ADD_BOOK_SCS,

      payload: response.data.data,
    });

    console.log(response);

    //dispatch({ type: VALIDATION_CLEAR });

    //NotificationManager.success(i18n.t(response.status.description));
  } else {
    // eslint-disable-next-line no-lonely-if

    if (typeof response.status === "string") {
      //NotificationManager.error(i18n.t(response.status.description));

      dispatch({ type: ADD_BOOK_FLR });

      //dispatch({ type: VALIDATION_CLEAR });
    } else {
      //dispatch({ type: VALIDATION_MESSAGE, message: response.status });
    }
  }
};

//ACTION DELETE

export const deleteBook = (id) => async (dispatch) => {
  dispatch({ type: DELETE_BOOK_REQ });

  const deleteFunc = async () => {
    return fetch(`${URL}/book/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  const response = await deleteFunc();

  if (response.status === 200) {
    dispatch({
      type: DELETE_BOOK_SCS,

      payload: id,
    });

    //dispatch({ type: VALIDATION_CLEAR });

    //NotificationManager.success(i18n.t(response.status.description));
  } else {
    // eslint-disable-next-line no-lonely-if

    if (typeof response.status === "string") {
      //NotificationManager.error(i18n.t(response.status.description));

      dispatch({ type: DELETE_BOOK_FLR });

      //dispatch({ type: VALIDATION_CLEAR });
    } else {
      //dispatch({ type: VALIDATION_MESSAGE, message: response.status });
    }
  }
};

//ACTION EDIT

export const editBook = (dataBook, bookId) => async (dispatch) => {
  dispatch({ type: EDIT_BOOK_REQ });

  const addFunc = async () => {
    return axios
      .patch(`${URL}/book/${bookId}`, {
        name: dataBook.name,
        tagline: dataBook.tagline,
        category_id: dataBook.category_id,
        author_id: dataBook.author_id,
        short_desc: dataBook.short_desc,
        is_published: dataBook.is_published,
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

  if (response.status === 200) {
    dispatch({
      type: EDIT_BOOK_SCS,

      payload: response.data.data,

      bookId: bookId,
    });

    //dispatch({ type: VALIDATION_CLEAR });

    //NotificationManager.success(i18n.t(response.status.description));
  } else {
    // eslint-disable-next-line no-lonely-if

    if (typeof response.status === "string") {
      //NotificationManager.error(i18n.t(response.status.description));

      dispatch({ type: EDIT_BOOK_FLR });

      //dispatch({ type: VALIDATION_CLEAR });
    } else {
      //dispatch({ type: VALIDATION_MESSAGE, message: response.status });
    }
  }
};

//ACTION EDIT

export const bookForEdit = (bookId) => async (dispatch) => {
  bookId
    ? dispatch({
        type: ONE_BOOK_ADD,
        payload: bookId,
      })
    : dispatch({
        type: ONE_BOOK_DELETE,
        payload: bookId,
      });
};

/**

 * REDUCERS

 */

const INIT_STATE = {
  loading: false,
  data: [],
  total: 0,
  oneBook: null,
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
      };

    case ADD_BOOK_SCS:
      return {
        ...state,

        loading: false,

        data: [...state.data, action.payload],

        oneBook: null,
      };

    case ADD_BOOK_FLR:
      return {
        ...state,

        loading: false,
      };
    case DELETE_BOOK_REQ:
      return {
        ...state,

        loading: true,

        data: state.data,

        total: state.total,
      };

    case DELETE_BOOK_SCS:
      return {
        ...state,
        loading: false,

        data: state.data.filter((book) => book.uuid !== action.payload),
        oneBook: null,
      };
    case DELETE_BOOK_FLR:
      return {
        ...state,

        loading: false,

        data: state.data,

        total: state.total,
      };
    case EDIT_BOOK_REQ:
      return {
        ...state,

        loading: true,
      };

    case EDIT_BOOK_SCS:
      return {
        ...state,
        loading: false,

        data: state.data.map((item) => {
          if (item.uuid === action.bookId) {
            item = action.payload;
            return item;
          }
          return item;
        }),
        oneBook: null,
      };
    case EDIT_BOOK_FLR:
      return {
        ...state,

        loading: false,
      };
    case ONE_BOOK_ADD:
      return {
        ...state,
        oneBook: state.data.filter((book) => book.uuid === action.payload)[0],
      };
    case ONE_BOOK_DELETE:
      return {
        ...state,
        oneBook: null,
      };
  }
}
