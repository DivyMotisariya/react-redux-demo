const redux = require("redux");
const { createStore, combineReducers } = redux;

const BUY_CAKE = "BUY_CAKE";
const RETURN_CAKE = "RETURN_CAKE";

const BUY_ICECREAM = "BUY_ICECREAM";

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

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
  };
}

// const initialState = {
//   noOfCakes: 10,
//   noOfIceCreams: 20,
// };

const initialCakeState = {
  noOfCakes: 10,
};

const initialIceCreamState = {
  noOfIceCreams: 20,
};

// Reducer structure
// (previousState, action) => newState

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         ...state,
//         noOfCakes: state.noOfCakes - 1,
//       };
//     case BUY_ICECREAM:
//       return {
//         ...state,
//         noOfIceCreams: state.noOfIceCreams - 1,
//       };
//     case RETURN_CAKE:
//       return {
//         ...state,
//         noOfCakes: state.noOfCakes + 1,
//       };
//     default:
//       return state;
//   }
// };

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        noOfCakes: state.noOfCakes - 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        noOfIceCreams: state.noOfIceCreams - 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer);

console.log("initial state", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();
