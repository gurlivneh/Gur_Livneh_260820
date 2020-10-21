import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';

const MyModal = (props) => {
  const error = useSelector(
    (state) => state.reducer.error,
    () => {},
  );

  return (
    <>
      <ModalBox>
        <ModalTitle>
          <ModalText>{error}</ModalText>
        </ModalTitle>
        <Button>
          <ModalText>X</ModalText>
        </Button>
      </ModalBox>
    </>
  );
};

export default MyModal;

const ModalBox = styled.View`
  width: 90%;
  height: 40%;
  background-color: white;
  border-radius: 7px;
  display: flex;
  padding: 10px;
  elevation: 30;
  margin-top: 15px;
`;

const ModalText = styled.Text`
  font-size: 18px;
`;
const ModalTitle = styled.View`
  font-size: 20px;
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Button = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 5px;
`;
