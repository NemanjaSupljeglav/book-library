

/**

|--------------------------------------------------

| IMPORTS

|--------------------------------------------------

**/

import {

  postFunc,

  putFunc,

  getFunc,

  deleteFunc,

} from "Services/mainApiServices";


import { NotificationManager } from "react-notifications";

import i18n from "i18next";


import { VALIDATION_MESSAGE, VALIDATION_CLEAR } from "./Validation";


/**

|--------------------------------------------------

| TYPES

|--------------------------------------------------

**/



const GET_ALL_MIP_HEADER_IMPORT_REQ = "auth/GET_ALL_MIP_HEADER_IMPORT_REQ";

const GET_ALL_MIP_HEADER_IMPORT_SCS = "auth/GET_ALL_MIP_HEADER_IMPORT_SCS";

const GET_ALL_MIP_HEADER_IMPORT_FLR = "auth/GET_ALL_MIP_HEADER_IMPORT_FLR";



const GET_ALL_MIP_HEADER_REQ = "auth/GET_ALL_MIP_HEADER_REQ";

const GET_ALL_MIP_HEADER_SCS = "auth/GET_ALL_MIP_HEADER_SCS";

const GET_ALL_MIP_HEADER_FLR = "auth/GET_ALL_MIP_HEADER_FLR";



const CREATE_MIP_HEADER_REQ = "auth/CREATE_MIP_HEADER_REQ";

const CREATE_MIP_HEADER_SCS = "auth/CREATE_MIP_HEADER_SCS";

const CREATE_MIP_HEADER_FLR = "auth/CREATE_MIP_HEADER_FLR";



const GET_ONE_MIP_HEADER_REQ = "auth/GET_ONE_MIP_HEADER_REQ";

const GET_ONE_MIP_HEADER_SCS = "auth/GET_ONE_MIP_HEADER_SCS";

const GET_ONE_MIP_HEADER_FLR = "auth/GET_ONE_MIP_HEADER_FLR";



const DEACTIVATE_MIP_HEADER = "auth/DEACTIVATE_MIP_HEADER";



const UPDATE_MIP_HEADER = "auth/UPDATE_MIP_HEADER";



/*
 *
 * ACTIONS
 *
 */



export const getAllMipHeaderImport = (body) => async (dispatch) => {

  dispatch({ type: GET_ALL_MIP_HEADER_IMPORT_REQ });



  const response = await postFunc("importporeznaHeadMip/pagination", body);



  if (response.status.errorCode === 200) {

    dispatch({

      type: GET_ALL_MIP_HEADER_IMPORT_SCS,

      payload: { data: response.data, total: response.total },

    });

    NotificationManager.success(i18n.t(response.status.description));

  } else {

    dispatch({ type: GET_ALL_MIP_HEADER_IMPORT_FLR });

    NotificationManager.error(i18n.t(response.status.description));

  }

};



export const getAllMipHeader = (body) => async (dispatch) => {

  dispatch({ type: GET_ALL_MIP_HEADER_REQ });



  const response = await postFunc("importporeznaHead/pagination", body);



  if (response.status.errorCode === 200) {

    dispatch({

      type: GET_ALL_MIP_HEADER_SCS,

      payload: { data: response.data, total: response.total },

    });

    NotificationManager.success(i18n.t(response.status.description));

  } else {

    dispatch({ type: GET_ALL_MIP_HEADER_FLR });

    NotificationManager.error(i18n.t(response.status.description));

  }

};

​

export const createMipHeader = (body, handleOpen) => async (dispatch) => {

  dispatch({ type: CREATE_MIP_HEADER_REQ });

  const response = await postFunc("importPoreznaHeadMip", body);

​

  if (response.status.errorCode === 200) {

    dispatch({

      type: CREATE_MIP_HEADER_SCS,

      payload: response.data,

    });

    dispatch({ type: VALIDATION_CLEAR });

    handleOpen();

    NotificationManager.success(i18n.t(response.status.description));

  } else {

    // eslint-disable-next-line no-lonely-if

    if (typeof response.status.description === "string") {

      NotificationManager.error(i18n.t(response.status.description));

      dispatch({ type: CREATE_MIP_HEADER_FLR });

      dispatch({ type: VALIDATION_CLEAR });

    } else {

      dispatch({ type: VALIDATION_MESSAGE, message: response.status });

    }

  }

};

​

export const updateMipHeader = (body, id, handleOpen) => async (dispatch) => {

  const response = await putFunc(`importPoreznaHeadMip/${id}`, body);

​

  if (response.status.errorCode === 200) {

    dispatch({ type: UPDATE_MIP_HEADER, payload: response.data });

    dispatch({ type: VALIDATION_CLEAR });

    handleOpen();

    NotificationManager.success(i18n.t(response.status.description));

  } else {

    // eslint-disable-next-line no-lonely-if

    if (typeof response.status.description === "string") {

      NotificationManager.error(i18n.t(response.status.description));

      dispatch({ type: VALIDATION_CLEAR });

    } else {

      dispatch({ type: VALIDATION_MESSAGE, message: response.status });

    }

  }

};

​

export const getOneMipHeader = (id) => async (dispatch) => {

  dispatch({ type: GET_ONE_MIP_HEADER_REQ });

  const response = await getFunc(`importPoreznaHeadMip/${id}`);

​

  if (response.status.errorCode === 200) {

    dispatch({

      type: GET_ONE_MIP_HEADER_SCS,

      payload: response.data,

    });

  } else {

    dispatch({ type: GET_ONE_MIP_HEADER_FLR });

    NotificationManager.error(i18n.t(response.status.description));

  }

};

​

export const deactivateMipHeader = (id, handleOpen) => async (dispatch) => {

  const response = await deleteFunc(`importPoreznaHeadDeactivateMip/${id}`);

​

  if (response.status.errorCode === 200) {

    dispatch({ type: DEACTIVATE_MIP_HEADER, payload: response.data });

    handleOpen();

  } else {

    NotificationManager.error(i18n.t(response.status.description));

  }

};

​

/**

 * REDUCERS

 */

const INIT_STATE = {

  loading: false,

  data: [],

  createMipHead: null,

  oneMipHead: null,

};

​

export default function reducer(state = INIT_STATE, action = {}) {

  switch (action.type) {

    case GET_ALL_MIP_HEADER_REQ:

      return {

        ...state,

        loading: true,

        data: state.data,

      };

    case GET_ALL_MIP_HEADER_SCS:

      return {

        ...state,

        loading: false,

        data: action.payload.data,

        total: action.payload.total,

      };

    case GET_ALL_MIP_HEADER_FLR:

      return {

        ...state,

        loading: false,

        data: state.data,

      };

​

    case GET_ALL_MIP_HEADER_IMPORT_REQ:

      return {

        ...state,

        loading: true,

        data: state.data,

      };

    case GET_ALL_MIP_HEADER_IMPORT_SCS:

      return {

        ...state,

        loading: false,

        data: action.payload.data,

        total: action.payload.total,

      };

    case GET_ALL_MIP_HEADER_IMPORT_FLR:

      return {

        ...state,

        loading: false,

        data: state.data,

      };

​

    case CREATE_MIP_HEADER_REQ:

      return {

        ...state,

        loading: true,

        createMipHead: state.createMipHead,

      };

    case CREATE_MIP_HEADER_SCS:

      return {

        ...state,

        loading: false,

        createMipHead: action.payload,

        data: [...state.data, action.payload],

      };

    case CREATE_MIP_HEADER_FLR:

      return {

        ...state,

        loading: false,

        createMipHead: state.createMipHead,

      };

​

    case UPDATE_MIP_HEADER:

      return {

        ...state,

        data: state.data.map((item) => {

          if (item.id === action.payload.id) {

            return { ...action.payload };

          }

          return item;

        }),

      };

​

    case GET_ONE_MIP_HEADER_REQ:

      return {

        ...state,

        loading: false,

        oneMipHead: state.oneMipHead,

      };

    case GET_ONE_MIP_HEADER_SCS:

      return {

        ...state,

        loading: false,

        oneMipHead: action.payload,

      };

    case GET_ONE_MIP_HEADER_FLR:

      return {

        ...state,

        loading: true,

        oneMipHead: state.oneMipHead,

      };

​

    case DEACTIVATE_MIP_HEADER:

      return {

        ...state,

        data: state.data.map((item) => {

          if (item.id !== action.payload.id) {

            return { ...action.payload };

          }

          return item;

        }),

      };

​

    default:

      return state;

  }

}

​

