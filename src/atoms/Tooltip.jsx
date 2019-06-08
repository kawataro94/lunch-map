import React, {useState} from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import ShopModal from './ShopModal';
import ActionCreator from '../flux/actions/ActionCreator';

const Tip = styled.div`
  position: relative;
  display: inline-block;
  top: -48px;
  margin: 0 -60px;
  padding: 7px 10px;
  min-width: 120px;
  max-width: 100%;
  color: #555;
  font-size: 16px;
  background: #fff;
  border: solid 2px #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  z-index: 3;
  :before {
    content: '';
    position: absolute;
    bottom: -24px;
    left: 50%;
    margin-left: -15px;
    border: 12px solid transparent;
    border-top: 12px solid #fff;
    z-index: 2;
  }
  :after {
    content: '';
    position: absolute;
    bottom: -29px;
    left: 50%;
    margin-left: -17px;
    border: 14px solid transparent;
    border-top: 14px solid #ddd;
    z-index: 1;
  }
  :hover {
    z-index: 100;
    cursor: pointer;
  }
`;

const ShopName = styled.div`
  margin: 0;
  padding: 0;
  text-align: center;
  font-weight: bold;
  color: #000;
`;

Modal.setAppElement('#root');

export default ({store, setModalId, update}) => {
  const [isModal, displayModal] = useState(false);

  const modalToggle = () => {
    displayModal(!isModal);
    if (isModal) {
      ActionCreator.resetShopId();
    }
  };

  const shopModal = id => {
    modalToggle();
    setModalId(id);
  };

  return (
    <>
      <Tip onClick={() => shopModal(store.id)}>
        <ShopName>{store.shopName}</ShopName>
      </Tip>
      <ShopModal
        store={store}
        update={update}
        isModal={isModal}
        displayModal={displayModal}
      />
    </>
  );
};
