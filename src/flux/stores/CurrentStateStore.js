import { ReduceStore } from "flux/utils";
import AppDispatchers from "../dispatchers/AppDispatchers";
import { actions } from "../Constants";

class ShopStore extends ReduceStore {
  getInitialState() {
    return {
      loginState: false,
      currentCategory: 'all',
      canRegisterState: false,
      isActiveAddShopModal: false,
      isActiveAddCategoryModal: false,
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case actions.CHANGE_LOGIN_STATE:
        return { ...state, loginState: action.data };
      case actions.CHANGE_CURRENT_CATEGORY:
        return { ...state, currentCategory: action.data };
      case actions.CHANGE_CAN_REGISTER_STATE:
        return { ...state, canRegisterState: action.data };
      case actions.OPEN_ADD_SHOP_MODAL:
        return { ...state, isActiveAddShopModal: action.data };
      case actions.OPEN_ADD_CATEGORY_MODAL:
        return { ...state, isActiveAddCategoryModal: action.data };
      default:
        return state;
    }
  }
}

export default new ShopStore(AppDispatchers);