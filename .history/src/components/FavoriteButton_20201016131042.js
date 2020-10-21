import React from 'react';
import styled from 'styled-components/native';
import * as Actions from '../state/actions';
import {useDispatch} from 'react-redux';

const FavoriteButton = (props) => {
  const dispatch = useDispatch();
  const isLandscape = props.isLandscape
  const isFavorite = props.isFavorite
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
    <>
            <Box isLandscape={isLandscape}>
              <Button
                onPress={handleFavoritesButton}
                isFavorite={isFavorite}>
                <Logo
                  source={
                    isFavorite ? Images.FAVORITE_STAR : Images.NOT_FAVORITE_STAR
                  }
                />
              </Button>
            </Box>
    </>
  );
};

export default FavoriteButton;

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