import { createStore } from "redux";

const initialState = {
  cart: [],
};

const reducerFn = (state = initialState, action) => {
  switch (action.type) {
    case "add":
      const alreadyInCart = state.cart.findIndex((element) => element.id === action.payLoad.id);
      // Already in cart
      if (alreadyInCart !== -1) {
        // return { ...state, cart: [...state.cart, action.payLoad] };
        const copyArray = [...state.cart];
        copyArray[alreadyInCart].count += 1;
        return { ...state, cart: copyArray };
      }
      // Not already in cart
      else {
        return { ...state, cart: [...state.cart, action.payLoad] };
      }
    default: {
      return state;
    }
  }
  // if (action.type === "add") {
  //   // return { ...state, cart: state.cart.concat(action.payLoad) };
  //   // return { ...state, cart: [] };
  // }
};

const store = createStore(reducerFn);
export default store;
