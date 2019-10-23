import { ReduceStore } from "flux/utils";
import AppDispatchers from "../dispatchers/AppDispatchers";
import { actions } from "../Constants";

class ShopStore extends ReduceStore {
  getInitialState() {
    return {
      category: ''
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case actions.CHANGE_CURRENT_CATEGORY:
        return { currentCategory: action.data };
      default:
        return state;
    }
  }
}

export default new ShopStore(AppDispatchers);