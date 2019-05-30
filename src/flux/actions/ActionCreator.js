import flux from "../dispatchers/AppDispatchers";
import { actions } from "../Constants";

const ActionCreators = {
  //ActionCreators
  change() {
    flux.dispatch({
      type: actions.CHANGE_DETAIL_MESSAGE,
      value: "acnseeeee"
    });
    console.log("dispatch");
  }
};

export default ActionCreators;
