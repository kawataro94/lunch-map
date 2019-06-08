import React from "react";
import styled from "styled-components";

export default ({ label, onChange }) => {
  const ShopLabel = styled.h2`
    margin: 0;
    font-size: 14px;
  `;
  const Input = styled.input`
    width: 300px;
    padding: 5px;
    border: 1px solid rgb(0, 0, 0);
  `;

  return (
    <div>
      <div>
        <ShopLabel>{label}</ShopLabel>
      </div>
      <Input type="text" onChange={onChange} />
    </div>
  );
};
