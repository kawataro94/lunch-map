import flux from "../dispatchers/AppDispatchers";
import { actions } from "../Constants";

const StateActionCreators = {
  changeLoginState(loginState) {
    flux.dispatch({
      type: actions.CHANGE_LOGIN_STATE,
      data: loginState
    });
  },
  changeCurrentCategory(currentCategory) {
    flux.dispatch({
      type: actions.CHANGE_CURRENT_CATEGORY,
      data: currentCategory
    });
  },
  changeCanRegisterState(canRegisterState) {
    flux.dispatch({
      type: actions.CHANGE_CAN_REGISTER_STATE,
      data: !canRegisterState
    });
  },
  openAddShopModal(isActiveAddShopModal) {
    flux.dispatch({
      type: actions.OPEN_ADD_SHOP_MODAL,
      data: isActiveAddShopModal
    });
  },
  openAddCategoryModal(isActiveAddCategoryModal) {
    flux.dispatch({
      type: actions.OPEN_ADD_CATEGORY_MODAL,
      data: isActiveAddCategoryModal
    });
  }
};

export default StateActionCreators;