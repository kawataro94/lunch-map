import { ReduceStore } from "flux/utils";
import AppDispatcher from "../dispatchers/AppDispatcher";
import { actions } from "../Constants";

class FlashStore extends ReduceStore {
  getInitialState() {
    return []; //stateの初期値を定義
  }

  reduce(state, action) {
    switch (action.type) {
      case actions.CHANGE_DETAIL_MESSAGE:
        return state.concat(action.data);
      default:
        //現在のstateをそのまま返す
        return state;
    }
  }
}

export default new FlashStore(AppDispatcher);
