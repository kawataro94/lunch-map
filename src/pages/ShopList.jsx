import React from 'react';
import styled from 'styled-components';

import { Container } from "flux/utils";
import { getShopData } from "../shopData";
import { getCategoryData } from "../categoryData";
import ShopStore from "../flux/stores/ShopStore";
import CurrentStateStore from "../flux/stores/CurrentStateStore";

const GridWrap = styled.div`
  color: black; 
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 420px;
`;

const PieceWrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 420px;
  padding: 10px;
`

const Piece = styled.div` 
  height: 100%;
  border: solid #ddd 1px;
  border-radius: 10px;
  overflow: hidden;
  :hover {
    top: -10px;
    box-shadow: 0px 10px 10px #ddd;
    transition: all 0.3s;
  }
`

const Sumnail = styled.div` 
  height: 75%;
  display: block;
  position: relative;
  overflow: hidden;
`

const Title = styled.h3` 
  margin: 0;
`

const Description = styled.p` 
`

const TextBox = styled.div` 
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  padding: 10px;
`

const Image = styled.img` 
  top: 50%;
  width: 100%;
  position: relative;
  transform: translateY(-50%);
`
class ShopList extends React.Component {

  static getStores() {
    return [ShopStore, CurrentStateStore];
  }

  static calculateState() {
    return {
      shopStore: ShopStore.getState(),
      currentStateStore: CurrentStateStore.getState()
    };
  }

  constructor(props) {
    super(props);
    this.state = ({
      stores: [],
      categories: [],
      imageUrls: []
    })
  }

  setImages = async (stores) => {

    stores.map((store, idx) => {
      let imageUrl = `https://firebasestorage.googleapis.com/v0/b/lunch-map-1555836368736.appspot.com/o/${encodeURIComponent(store.fileName)}?alt=media&token=${store.accessToken}`;
      return stores[idx]['imageUrl'] = imageUrl;
    })
  }

  setShopData = async () => {
    const shopData = await getShopData()

    await this.setState({
      stores: shopData
    });
    await this.setImages(shopData);
  };

  setCategoriesData = () => {
    const categoryList = []

    getCategoryData().then(categories => {
      categories.map(category => categoryList.push(category.name));
      this.setState({
        categories: categoryList
      });
    })
  }

  componentDidMount() {
    this.setShopData();
    this.setCategoriesData();
  }

  render() {
    const { stores } = this.state;
    return (
      <div>
        <GridWrap>
          {stores.map((store, idx) => {
            return (
              <PieceWrap key={idx}>
                <a href={store.shopLink} style={{ color: 'black', textDecoration: 'none' }}>
                  <Piece>
                    <Sumnail><Image src={store.imageUrl} /></Sumnail>
                    <TextBox>
                      <Title>{store.shopName}</Title>
                      <Description>{store.shopDetail}</Description>
                    </TextBox>
                  </Piece>
                </a>
              </PieceWrap>
            )
          })}
        </GridWrap>
      </div >
    );
  }
}

export default Container.create(ShopList);