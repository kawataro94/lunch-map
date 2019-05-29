import flux from "../dispatchers/AppDispatcher";
import { actions } from "../Constants";

const FlashActionCreators = {
  //ActionCreators

  addSuccess(msg, support_msg = "") {
    //ActionCreator
    this.clear();
    const message = {
      type: "success",
      message: msg,
      support_message: support_msg
    };
    flux.dispatch({
      //Actionオブジェクト
      type: actions.FLASH_SUCCESS_ADD, //Actionを識別する一意の文字列,
      data: message //ロジックの結果をいれる
    });
    const target = this;
    setTimeout(function() {
      target.clear();
    }, 3000);
  },
  remove(index) {
    flux.dispatch({
      type: actions.FLASH_REMOVE,
      data: index
    });
  },

  clear() {
    flux.dispatch({
      type: actions.FLASH_CLEAR
    });
  },

  change() {
    flux.dispatch({
      type: actions.CHANGE_DETAIL_MESSAGE
    });
  }
};

export default FlashActionCreators;
