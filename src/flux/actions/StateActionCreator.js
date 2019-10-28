import flux from "../dispatchers/AppDispatchers";
import { actions } from "../Constants";

const StateActionCreators = {
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
  }
};

export default StateActionCreators;