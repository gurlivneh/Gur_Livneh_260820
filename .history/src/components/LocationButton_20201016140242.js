import React from 'react';
import styled from 'styled-components/native';
import * as Actions from '../state/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as Images from '../images/index';


const LocationButton = (props) => {
  const isLandscape = props.isLandscape;
  const useGeoposition = useSelector(
    (state) => state.reducer.useGeoposition,
    () => {},
  );
  setUseGeoposition

  return (
    <Box isLandscape={isLandscape}>
    <Button
      onPress={() => {dispatch(Actions.setUseGeoposition(useGeoposition ? false : true))}}>
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
