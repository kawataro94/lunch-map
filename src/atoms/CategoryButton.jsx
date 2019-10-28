import React, { useState, useEffect } from 'react'

import StateActionCreator from "../flux/actions/StateActionCreator";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const CategoryButton = () => {

  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = async e => {
    setSelectedCategory(e.target.value)
  };

  useEffect(() => {
    StateActionCreator.changeCurrentCategory(selectedCategory);
  }, [selectedCategory])

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