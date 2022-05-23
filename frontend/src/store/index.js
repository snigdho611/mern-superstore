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
        const copyArray = [...state.cart];
        copyArray[alreadyInCart].count += 1;
        return { ...state, cart: copyArray };
      }
      // Not already in cart
      else {
        return { ...state, cart: [...state.cart, action.payLoad] };
      }
    case "dec":
      const index = state.cart.findIndex((element) => element.id === action.payLoad.id);

      // Save a copy of the existing cart
      let copyArray = [...state.cart];
      // If the count of the corresponding element is down to 1,
      // that means it needs to be deleted from cart the next time cross is pressed
      if (copyArray[index].count - 1 === 0) {
        copyArray.splice(index, 1);
        return { ...state, cart: copyArray };
      }
      // Otherwise, simply decrement the count by 1 for that particular element
      else {
        copyArray[index].count -= 1;
        return { ...state, cart: copyArray };
      }
    default: {
      return state;
    }
  }
};

const store = createStore(reducerFn);
export default store;
