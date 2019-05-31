import flux from "../dispatchers/AppDispatchers";
import { actions } from "../Constants";

const ActionCreators = {
  //ActionCreators

  postDetail(shopDetail) {
    flux.dispatch({
      type: actions.POST_INITIAL_SHOPDETAIL,
      data: shopDetail
    });
  },
  change(changeDetail) {
    flux.dispatch({
      type: actions.POST_CHANGE_SHOPDETAIL,
      data: changeDetail
    });
  },
  postId(id) {
    flux.dispatch({
      type: actions.POST_SHOPID,
      data: id
    });
  }
};

export default ActionCreators;
