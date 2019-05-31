import { ReduceStore } from "flux/utils";
import AppDispatchers from "../dispatchers/AppDispatchers";
import { actions } from "../Constants";

class ShopStore extends ReduceStore {
  getInitialState() {
    return {
      shopDetail: [],
      shopId: []
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case actions.POST_INITIAL_SHOPDETAIL:
        console.log("post_initial_shopdetail");
        return { ...state, shopDetail: action.data };
      case actions.POST_CHANGE_SHOPDETAIL:
        console.log("post_change_shopdetail");
        return { ...state, shopDetail: action.data };
      case actions.POST_SHOPID:
        console.log("post_shopid");
        return { ...state, shopId: action.data };
      // case actions.GET_SHOPDETAIL:
      // console.log("get_shopDetail");
      //   return { ...state, shopId: action.data };
      default:
        return state;
    }
  }
}

export default new ShopStore(AppDispatchers);
