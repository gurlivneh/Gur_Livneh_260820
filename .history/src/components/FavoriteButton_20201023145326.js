import React from 'react';
import styled from 'styled-components/native';
import * as Actions from '../state/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as Images from '../images/index';


const FavoriteButton = (props) => {
  const dispatch = useDispatch();
  const locationKey = useSelector(
    (state) => state.reducer.locationKey,
    () => {},
  );
  const city = useSelector(
    (state) => state.reducer.city,
    () => {},
  );
  const isFavorite = useSelector(
    (state) => state.reducer.isFavorite,
    () => {},
  );
  
  const isLandscape = props.isLandscape;
  const handleFavoritesButton = () => {
    if (!isFavorite) {
      dispatch(
        Actions.addFavorite({
          city: city,
          locationKey: locationKey,
        }),
      );
    } else {
      dispatch(
        Actions.removeFavorite({
          city: city,
          locationKey: locationKey,
        }),
      );
    }
  };

  return (
    <Box isLandscape={isLandscape}>
      <Button onPress={handleFavoritesButton} isFavorite={isFavorite}>
        <Logo
          source={isFavorite ? Images.FAVORITE_STAR : Images.NOT_FAVORITE_STAR}
        />
      </Button>
    </Box>
  );
};

export default FavoriteButton;

const Box = styled.View`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: ${(props) =>
  props.isLandscape ? 'center' : 'flex-end'};
    background-color:yellow;

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
`;
