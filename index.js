const redux = require("redux");
const { createStore } = redux;

const BUY_CAKE = "BUY_CAKE";
const RETURN_CAKE = "RETURN_CAKE";

function buyCake() {
  return {
    type: BUY_CAKE,
  };
}

function returnCake() {
  return {
    type: RETURN_CAKE,
  };
}

const initialState = {
  noOfCakes: 10,
};

// Reducer structure
// (previousState, action) => newState

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        noOfCakes: state.noOfCakes - 1,
      };
    case RETURN_CAKE:
      return {
        ...state,
        noOfCakes: state.noOfCakes + 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

console.log("initial state", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);

store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(returnCake());

store.dispatch(buyCake());
store.dispatch(returnCake());
store.dispatch(returnCake());

unsubscribe();
