import React from "react";
import ShopStore from "../flux/stores/ShopStore";
import ActionCreator from "../flux/actions/ActionCreator";
import { Container } from "flux/utils";
import TextField from '@material-ui/core/TextField';

class Form extends React.Component {
  static getStores() {
    return [ShopStore];
  }

  static calculateState() {
    return {
      data: ShopStore.getState()
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      stores: []
    };
  }

  handleChange = async e => {
    await ActionCreator.changeDetail(e.target.value);
    this.props.update();
  };

  componentDidMount() {
    ActionCreator.postDetail(this.props.shopDetail);
    ActionCreator.postId(this.props.id);
  }

  render() {
    const { shopDetail } = this.state.data;
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