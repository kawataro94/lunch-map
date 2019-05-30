import { ReduceStore } from "flux/utils";
import AppDispatchers from "../dispatchers/AppDispatchers";
import { actions } from "../Constants";

class ShopStore extends ReduceStore {
  getInitialState() {
    return []; //stateの初期値を定義
  }

  reduce(state, action) {
    console.log(action);
    console.log(state);
    switch (action.type) {
      case actions.CHANGE_DETAIL_MESSAGE:
        console.log("store");
        return state.concat("connect");
      default:
        //現在のstateをそのまま返す
        return state;
    }
  }

  // reduce(state, action) {
  //   switch (action.type) {
  //     case actions.CHANGE_DETAIL_MESSAGE:
  //       return state.concat(action.data);
  //     default:
  //       //現在のstateをそのまま返す
  //       return state;
  //   }
  // }
}

export default new ShopStore(AppDispatchers);
