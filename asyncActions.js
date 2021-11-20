const { createStore, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");
const axios = require("axios");

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS = "FETCH_USERS";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAIL = "FETCH_USERS_FAIL";

const fetchUsers = () => {
  return {
    type: FETCH_USERS,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFail = (error) => {
  return {
    type: FETCH_USERS_FAIL,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAIL:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const fetchUsersFunction = () => (dispatch) => {
  dispatch(fetchUsers());
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((data) => {
      const users = data.data.map((user) => user.id);
      dispatch(fetchUsersSuccess(users));
    })
    .catch((error) => {
      dispatch(fetchUsersFail(error.message));
    });
};

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchUsersFunction());
