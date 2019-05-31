import { ReduceStore } from "flux/utils";
import AppDispatchers from "../dispatchers/AppDispatchers";
import { actions } from "../Constants";

class ShopStore extends ReduceStore {
  getInitialState() {
    return {
      data: "initialState"
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case actions.CHANGE_DETAIL_MESSAGE:
        console.log("-------------");
        console.log(state.data);
        console.log(action.data);
        console.log("-------------");
        return action.data;
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
