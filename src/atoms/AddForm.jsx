import React from "react";
import ShopStore from "../flux/stores/ShopStore";
import StoreActionCreators from "../flux/actions/StoreActionCreators";
import { Container } from "flux/utils";
import StateActionCreators from "../flux/actions/StateActionCreators";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import { addShopData } from "../shopData";

class AddForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newShopName: "",
      newShopDetail: "",
      newShopCategory: "",
      newShopLink: "",
      lat: this.props.lat,
      lng: this.props.lng
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

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  }

  addShop = () => {
    StoreActionCreators.addShop(this.state);
    addShopData(this.state)
    this.props.setShopData()
    StateActionCreators.addNewShop(false);
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
            onChange={this.handleChange("newShopName")}
            margin="normal"
          />
          <FormControl required style={{ marginTop: 16, marginLeft: 20 }}>
            <InputLabel htmlFor="age-required">カテゴリ</InputLabel>
            <Select
              onChange={this.handleChange("newShopCategory")}
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
            onChange={this.handleChange("newShopDetail")}
            name="newShopDetail"
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
          onChange={this.handleChange("newShopLink")}
        />
        <div style={{ marginTop: 20 }}>
          <Button variant="contained" color="primary" onClick={() => this.addShop()}>登録する</Button>
        </div>
      </>
    );
  }
}

export default Container.create(AddForm);
