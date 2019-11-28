import React, { useState, useEffect } from 'react'

import StateActionCreators from "../flux/actions/StateActionCreators";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


const CategoryButton = ({ categories }) => {

  const [selectedCategory, setSelectedCategory] = useState('all');
  // const [categories, setCategoryState] = useState([]);

  const handleCategoryChange = async e => {
    setSelectedCategory(e.target.value)
  };

  useEffect(() => {
    StateActionCreators.changeCurrentCategory(selectedCategory);
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
          {
            categories.map((category, idx) => {
              return (
                <MenuItem value={category} key={idx}>{category}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    </div>
  )
}

export default CategoryButton;