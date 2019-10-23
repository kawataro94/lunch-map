import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import ActionCreator from "../flux/actions/ActionCreator";

const ButtonUL = styled.ul`
  display: flex;
  position: absolute;
  top: 300px;
  bottom: 0;
  right: 0;
  left: -180px;
`;

const CategoryButton = () => {

  const [categoryState, setCategoryState] = useState("all")

  useEffect(() => {
    ActionCreator.changeCurrentCategory(categoryState);
  }, [categoryState])

  const categories = [{ name: "中華", color: "default" }, { name: "和食", color: "primary" }, { name: "フレンチ", color: "secondary" }]

  return (
    <ButtonUL>
      {categories.map((category, idx) => {
        return (
          <div style={{ marginRight: "10px" }} key={idx}>
            <Button
              variant="contained"
              onClick={() => setCategoryState(category.name)}
              color={category.color}
            >{category.name}</Button>
          </div>
        )
      })}
    </ButtonUL>


    // < ButtonUL >
    //   <div style={{ marginRight: "10px" }}>
    //     <Button
    //       variant="contained"
    //       onClick={() => this.displayCategory("中華")}
    //     >
    //       中華
    //               </Button>
    //   </div>
    //   <div style={{ marginRight: "10px" }}>
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       onClick={() => this.displayCategory("和食")}
    //     >
    //       和食
    //               </Button>
    //   </div>
    //   <div style={{ marginRight: "10px" }}>
    //     <Button
    //       variant="contained"
    //       color="secondary"
    //       onClick={() => this.displayCategory("フレンチ")}
    //     >
    //       フレンチ
    //     </Button>
    //   </div>
    // </ButtonUL >
  )
}

export default CategoryButton;