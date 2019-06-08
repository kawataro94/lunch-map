import React, {useState} from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

import Form from './Form';

import ActionCreator from '../flux/actions/ActionCreator';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-20%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '500px',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
};

const CloseButton = styled.div`
  margin-top: 10px;
  border-radius: 5px;
  text-align: right;
`;

export default ({store, update, isModal, displayModal}) => {
  const modalToggle = () => {
    console.log('false');
    displayModal(!isModal);
    if (isModal) {
      console.log('true');
      ActionCreator.resetShopId();
    }
  };

  const ModalShopName = styled.h1`
    margin: 0;
    padding: 0;
    text-align: center;
    font-weight: bold;
    color: #000;
  `;

  return (
    <Modal isOpen={isModal} style={customStyles} contentLabel="Example Modal">
      {console.log(isModal)}
      <CloseButton onClick={() => modalToggle()}>close</CloseButton>
      <ModalShopName>{store.shopName}</ModalShopName>
      <Form update={update} shopDetail={store.shopDetail} id={store.id} />
    </Modal>
  );
};
