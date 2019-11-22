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
  addNewShop(isActiveAddModal) {
    flux.dispatch({
      type: actions.ADD_NEW_SHOP,
      data: isActiveAddModal
    });
  }
};

export default StateActionCreators;