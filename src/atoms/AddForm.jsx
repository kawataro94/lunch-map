import React from "react";
import styled from 'styled-components';

import ShopStore from "../flux/stores/ShopStore";
import { Container } from "flux/utils";
import StateActionCreators from "../flux/actions/StateActionCreators";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import { addShopData } from "../shopData";

import { uploadStoreImage } from '../storage'

const InputFile = styled.input` 
  opacity:0;  
  appearance: none;
  position: absolute;
  cursor: pointer;
`

class AddForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newShopName: "",
      newShopDetail: "",
      newShopCategory: "",
      newShopLink: "",
      lat: this.props.lat,
      lng: this.props.lng,
      file: ""
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
    addShopData(this.state)
    this.props.setShopData()
    StateActionCreators.openAddShopModal(false);
    uploadStoreImage(this.state.file);
  };

  handleFileSelect = e => {
    console.log('handleFileSelect', e.target.files[0])
    this.setState({ file: e.target.files[0] })
  }

  render() {
    const { categories } = this.props
    const categoriesExceptAll = categories.filter(category => category !== 'all')

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
              {
                categoriesExceptAll.map((category, idx) => {
                  return (
                    <MenuItem value={category} key={idx}>{category}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
          <Button
            size='large'
            variant="contained"
            color="default"
            style={{ marginTop: '20px', marginLeft: '25px', cursor: 'pointer' }}
          >Upload
          <InputFile
              type="file"
              className="inputFileBtnHide"
              onChange={this.handleFileSelect}
            /></Button>
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
          <Button variant="contained" color="primary" onClick={() => this.addShop()}>お店を登録する</Button>
        </div>
      </>
    );
  }
}

export default Container.create(AddForm);
