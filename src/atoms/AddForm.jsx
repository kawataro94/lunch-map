import React from "react";
import ShopStore from "../flux/stores/ShopStore";
import ActionCreator from "../flux/actions/ActionCreator";
import { Container } from "flux/utils";
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';

class AddForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newShopName: "",
      newShopDetail: "",
      newShopCategory: "",
      newShopLink: "",
    };
  }

  static getStores() {
    return [ShopStore];
  }

  static calculateState() {
    return {
      data: ShopStore.getState()
    };
  }

  handleNameChange = async e => {
    this.setState({
      newShopName: e.target.value
    })
  };

  handleDetailChange = async e => {
    this.setState({
      newShopDetail: e.target.value
    })
  };

  handleCategoryChange = async e => {
    this.setState({
      newShopCategory: e.target.value
    })
  };

  handleLinkChange = async e => {
    this.setState({
      newShopLink: e.target.value
    })
  };

  addShop = async () => {
    await ActionCreator.addShop(this.state.newShopName, this.state.newShopDetail, this.state.newShopCategory, this.state.newShopLink);
    this.props.addShop();
  };

  render() {

    return (
      <>
        <div>
          <TextField
            required
            id="standard-required"
            label="店名"
            defaultValue=""
            onChange={this.handleNameChange}
            margin="normal"
          />
          <FormControl required style={{ marginTop: 16, marginLeft: 20 }}>
            <InputLabel htmlFor="age-required">カテゴリ</InputLabel>
            <Select
              onChange={this.handleCategoryChange}
              name="category"
              style={{ width: 200 }}
              value={this.state.newShopCategory}
            >
              <MenuItem value="フレンチ">フレンチ</MenuItem>
              <MenuItem value="中華">中華</MenuItem>
              <MenuItem value="和食">和食</MenuItem>
            </Select>
          </FormControl>
        </div>
        <form>
          <TextField
            id="outlined-multiline-static"
            label="詳細について"
            multiline
            defaultValue=""
            margin="normal"
            variant="outlined"
            rows="16"
            style={{ width: 600, height: 350 }}
            onChange={this.handleDetailChange}
          />
        </form>
        <TextField
          id="outlined-multiline-static"
          label="Link"
          multiline
          defaultValue=""
          margin="normal"
          variant="outlined"
          rows="1"
          style={{ width: 600 }}
          onChange={this.handleLinkChange}
        />
        <div style={{ marginTop: 20 }}>
          <Button variant="contained" color="primary" onClick={() => this.addShop()}>
            登録する
        </Button>
        </div>
      </>
    );
  }
}

export default Container.create(AddForm);
