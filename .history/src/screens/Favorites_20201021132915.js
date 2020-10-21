import React, {useEffect, useState} from 'react';
import {SafeAreaView, Dimensions, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../state/actions';
import NavBar from '../components/NavBar';
import FavoritesBox from '../components/FavoritesBox';
import MyModal from '../components/MyModal';


const Favorites = ({navigation}) => {
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const isLandscape = width > height ? true : false;

  const dispatch = useDispatch();

  const favorites = useSelector(
    (state) => state.reducer.favorites,
    () => {},
  );
  const error = useSelector(
    (state) => state.reducer.error,
    () => {},
  );
  const selectCity = (locationKey, city) => {
    dispatch(Actions.sendCitySelection(locationKey, city));
  };

  const isDark = useSelector(
    (state) => state.reducer.isDark,
    () => {},
  );

  useEffect(() => {
    const handleChange = () => {
      setWidth(Dimensions.get('window').width);
      setHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', handleChange);

    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <>
      <SafeAreaView>
        <MainView height={height} width={width} isDark={isDark}>
          <NavBar navigation={navigation} isLandscape={isLandscape}/>
          <ScrollView>
            {favorites && (
              <WeatherRow>
                {favorites.map((item, i) => {
                  return (
                    <FavoritesBox
                      navigation={navigation}
                      selectCity={selectCity}
                      height={isLandscape ? height*0.42 : width*0.42}
                      width={isLandscape ? height*0.42 : width*0.42}
                      city={item.city}
                      locationKey={item.locationKey}
                      key={i}
                    />
                  );
                })}
              </WeatherRow>
            )}
          </ScrollView>
          {error && <MyModal />}
        </MainView>
      </SafeAreaView>
    </>
  );
};

export default Favorites;

const MainView = styled.View`
  background-color: whitesmoke;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding-bottom: ${(props) => props.height * 0.07}px;
  background-color: ${(props) => (props.isDark ? "lightgrey": "whitesmoke")};

`;



const WeatherRow = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:center;
`;

