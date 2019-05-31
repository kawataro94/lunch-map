import flux from "../dispatchers/AppDispatchers";
import { actions } from "../Constants";

const ActionCreators = {
  //ActionCreators
  change(shopDetail) {
    const message = {
      text: shopDetail
    };

    flux.dispatch({
      type: actions.CHANGE_DETAIL_MESSAGE,
      data: message.text
    });
    console.log("dispatch");
  }
};

export default ActionCreators;
