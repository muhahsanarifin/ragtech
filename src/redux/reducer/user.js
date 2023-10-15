import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  get: {
    data: null,
    isFulfilled: false,
    msg: null,
  },
  create: {
    data: null,
    isFulfilled: false,
    msg: null,
  },
  edit: {
    data: null,
    isFulfilled: false,
    msg: null,
  },
  delete: {
    data: null,
    isFulfilled: false,
    msg: null,
  },
  updateStatus: {
    data: null,
    isFulfilled: false,
    msg: null,
  },
  // Confirmation
  editConfirmation: {
    data: null,
    isFulfilled: false,
    msg: null,
  },
  detailConfirmation: {
    data: null,
    isFulfilled: false,
    msg: null,
  },
};

export const userSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    create: (prevState, action) => {
      return {
        ...prevState,
        create: {
          data: action.payload,
          isFulfilled: true,
          msg: "Success create data",
        },
        get: {
          data: action.payload,
          isFulfilled: true,
          msg: "Success get data",
        },
      };
    },
    edit: (prevState, action) => {
      return {
        ...prevState,
        edit: {
          data: action.payload,
          isFulfilled: true,
          msg: "Success update data",
        },
        get: {
          data: action.payload,
          isFulfilled: true,
          msg: "Success get data",
        },
      };
    },
    delete: (prevState, action) => {
      return {
        ...prevState,
        delete: {
          data: action.payload,
          isFulfilled: true,
          msg: "Success delete data",
        },
        get: {
          data: action.payload,
          isFulfilled: true,
          msg: "Success get data",
        },
      };
    },
    updateStatus: (prevState, action) => {
      return {
        ...prevState,
        updateStatus: {
          data: action.payload,
          isFulfilled: true,
          msg: "Success update status",
        },
        get: {
          data: action.payload,
          isFulfilled: true,
          msg: "Success get data",
        },
      };
    },
    // Confirmation
    editConfirmation: (prevState, action) => {
      return {
        ...prevState,
        editConfirmation: {
          data: action.payload,
          isFulfilled: true,
          msg: "Are you sure edit the data?",
        },
      };
    },
    detailConfirmation: (prevState, action) => {
      return {
        ...prevState,
        detailConfirmation: {
          data: action.payload,
          isFulfilled: true,
          msg: "Success get detail data",
        },
      };
    },
    // Clear data
    cdcreate: (prevState) => {
      return {
        ...prevState,
        create: {
          data: null,
          isFulfilled: false,
          msg: null,
        },
      };
    },
    cdedit: (prevState) => {
      return {
        ...prevState,
        edit: {
          data: null,
          isFulfilled: false,
          msg: null,
        },
      };
    },
    cdDelete: (prevState) => {
      return {
        ...prevState,
        delete: {
          data: null,
          isFulfilled: false,
          msg: null,
        },
      };
    },
    cdget: (prevState) => {
      return {
        ...prevState,
        get: {
          data: null,
          isFulfilled: false,
          msg: null,
        },
      };
    },
    cad: (prevState) => {
      return {
        ...prevState,
        get: {
          data: null,
          isFulfilled: false,
          msg: null,
        },
        create: {
          data: null,
          isFulfilled: false,
          msg: null,
        },
        edit: {
          data: null,
          isFulfilled: false,
          msg: null,
        },
        delete: {
          data: null,
          isFulfilled: false,
          msg: null,
        },
      };
    },
    cEditConfirmation: (prevState) => {
      return {
        ...prevState,
        editConfirmation: {
          data: null,
          isFulfilled: false,
          msg: null,
        },
      };
    },
    cDetailConfirmation: (prevState) => {
      return {
        ...prevState,
        detailConfirmation: {
          data: null,
          isFulfilled: false,
          msg: null,
        },
      };
    },
    cdUpdateStatus: (prevState) => {
      return {
        ...prevState,
        updateStatus: {
          data: null,
          isFulfilled: false,
          msg: null,
        },
      };
    },
  },
});

export const userAction = {
  ...userSlice.actions,
};

export default userSlice.reducer;
