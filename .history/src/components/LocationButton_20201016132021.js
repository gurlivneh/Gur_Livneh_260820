import React from 'react';
import styled from 'styled-components/native';
import * as Actions from '../state/actions';
import { useDispatch } from 'react-redux';
import * as Images from '../images/index';


const LocationButton = (props) => {
  const isLandscape = props.isLandscape;
  const useGeoposition = props.useGeoposition;
  
  return (
    <Box isLandscape={isLandscape}>
    <Button
      onPress={() => {
        useGeoposition
          ? props.setUseGeoposition(false)
          : props.setUseGeoposition(true);
      }}>
      <Logo
        source={
          useGeoposition ? Images.LOCATION_ON : Images.LOCATION_OFF
        }
      />
    </Button>
  </Box>
  );
};

export default LocationButton;

const Box = styled.View`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: ${(props) =>
    props.isLandscape ? 'flex-start' : 'flex-end'};
  padding: 10px;
`;

const Logo = styled.Image`
  width: 40px;
  height: 40px;
`;

const Button = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 5px;
`;
