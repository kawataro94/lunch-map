import flux from "../dispatchers/AppDispatchers";
import { actions } from "../Constants";

const ActionCreators = {
  postId(id) {
    flux.dispatch({
      type: actions.POST_SHOPID,
      data: id
    });
  },
  postDetail(shopDetail) {
    flux.dispatch({
      type: actions.POST_INITIAL_SHOPDETAIL,
      data: shopDetail
    });
  },
  changeDetail(changedDetail) {
    flux.dispatch({
      type: actions.POST_CHANGE_SHOPDETAIL,
      data: changedDetail
    });
  },
  resetShopId() {
    flux.dispatch({
      type: actions.RESET_SHOPID
    });
  }
};

export default ActionCreators;
