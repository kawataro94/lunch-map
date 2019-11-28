import React from "react";
import shopStore from "../flux/stores/ShopStore";
import StoreActionCreators from "../flux/actions/StoreActionCreators";
import { Container } from "flux/utils";
import TextField from '@material-ui/core/TextField';

import { updateShopDetail } from "../shopData";

class Form extends React.Component {
  static getStores() {
    return [shopStore];
  }

  static calculateState() {
    return {
      shopStore: shopStore.getState()
    };
  }

  handleChange = async e => {
    await StoreActionCreators.changeDetail(e.target.value);
    const updatedData = this.state.shopStore;
    const { store } = this.props;
    updateShopDetail(store, updatedData);
  };

  componentDidMount() {
    StoreActionCreators.postDetail(this.props.shopDetail);
    StoreActionCreators.postId(this.props.id);
  }

  render() {
    const { shopDetail } = this.props.store;
    return (
      <>
        <form>
          <TextField
            id="filled-multiline-static"
            label="詳細について"
            multiline
            rows="16"
            defaultValue={shopDetail}
            margin="normal"
            variant="filled"
            style={{ width: 500, height: 350 }}
            onChange={this.handleChange}
          />
        </form>
      </>
    );
  }
}

export default Container.create(Form);