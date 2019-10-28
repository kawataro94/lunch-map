import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import ActionCreator from "../flux/actions/ActionCreator";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const ButtonUL = styled.ul`
  display: flex;
  position: absolute;
  top: 300px;
  bottom: 0;
  right: 0;
  left: -180px;
`;

const CategoryButton = () => {

  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = async e => {
    setSelectedCategory(e.target.value)
  };

  useEffect(() => {
    ActionCreator.changeCurrentCategory(selectedCategory);
  }, [selectedCategory])

  const categories = [{ name: "中華", color: "default" }, { name: "和食", color: "primary" }, { name: "フレンチ", color: "secondary" }]

  return (
    <div>
      <FormControl style={{ marginTop: 16, marginLeft: 20 }}>
        <InputLabel htmlFor="age-required">カテゴリ</InputLabel>
        <Select
          onChange={handleCategoryChange}
          name="category"
          style={{ width: 200 }}
          value={selectedCategory}
        >
          <MenuItem value="all">all</MenuItem>
          <MenuItem value="フレンチ">フレンチ</MenuItem>
          <MenuItem value="中華">中華</MenuItem>
          <MenuItem value="和食">和食</MenuItem>
        </Select>
      </FormControl></div>

  )
}

export default CategoryButton;