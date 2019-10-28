import { ReduceStore } from "flux/utils";
import AppDispatchers from "../dispatchers/AppDispatchers";
import { actions } from "../Constants";

class ShopStore extends ReduceStore {
  getInitialState() {
    return {
      category: 'all',
      canRegisterState: false
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case actions.CHANGE_CURRENT_CATEGORY:
        return { ...state, currentCategory: action.data };
      case actions.CHANGE_CAN_REGISTER_STATE:
        return { ...state, canRegisterState: action.data };
      default:
        return state;
    }
  }
}

export default new ShopStore(AppDispatchers);