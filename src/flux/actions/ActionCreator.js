import flux from "../dispatchers/AppDispatchers";
import { actions } from "../Constants";

const ActionCreators = {
  //ActionCreators
  change(shopDetail) {
    const shop = {
      text: shopDetail
    };

    flux.dispatch({
      type: actions.CHANGE_DETAIL_MESSAGE,
      data: shop.text
    });
    console.log("dispatch");
    console.log(shop.text);
  }
};

export default ActionCreators;
