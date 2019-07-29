import { ReduceStore } from "flux/utils";
import AppDispatchers from "../dispatchers/AppDispatchers";
import { actions } from "../Constants";

class ShopStore extends ReduceStore {
  getInitialState() {
    return {
      shopDetail: [],
      shopId: [],
      shopName: [],
      newShopName: "",
      newShopDetail: "",
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case actions.POST_INITIAL_SHOPDETAIL:
        return { ...state, shopDetail: action.data };
      case actions.POST_CHANGE_SHOPDETAIL:
        return { ...state, shopDetail: action.data };
      case actions.POST_SHOPID:
        return { ...state, shopId: action.data };
      case actions.RESET_SHOPID:
        return {
          shopDetail: [],
          shopId: []
        };
      case actions.POST_NEWSHOP:
        return {
          // ...state,
          newShopName: action.data.name,
          newShopDetail: action.data.detail,
          shopDetail: action.data.detail
        };
      default:
        return state;
    }
  }
}

export default new ShopStore(AppDispatchers);
