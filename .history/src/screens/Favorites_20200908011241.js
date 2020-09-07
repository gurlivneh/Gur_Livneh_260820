import React, {useEffect, useState,} from 'react';
import {SafeAreaView, Text, Dimensions, ScrollView,  StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../state/actions';
import AsyncStorage from '@react-native-community/async-storage';

const Favorites = (props) => {
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state) => state.reducer.favorites,
    () => {},
  );
  const selectCity = (locationKey, city) => {
    dispatch(Actions.sendCitySelection(locationKey, city));
  };
  useEffect(() => {
    try {
      AsyncStorage.getItem('favorites').then((res) => {
        dispatch(Actions.setFavorites(JSON.parse(res)));
      });
    } catch (e) {
      alert('Failed to get the data');
    }
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
        <MainView height={height} width={width}>
          {favorites && (
            <ScrollView   style={styles.scrollView} 
            contentContainerStyle={styles.contentContainer}>
              {/* <WeatherRow> */}
                {favorites.map((item, i) => {
                  return (
                    <FavoriteBox
                      height={height}
                      width={width}
                      key={i}
                      onPress={() => {
                        selectCity(item.locationKey, item.city);
                        props.handleNav('Home');
                      }}>
                      <Text>{item.city}</Text>
                      <Text>{item.currentWeather.WeatherText}</Text>
                      <Text>
                        {item.currentWeather.Temperature.Imperial.Value +
                          item.currentWeather.Temperature.Imperial.Unit}
                      </Text>
                    </FavoriteBox>
                  );
                })}
              {/* </WeatherRow> */}
            </ScrollView>
          )}
        </MainView>
      </SafeAreaView>
    </>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollView: {
    // height: '20%',
    // width: '80%',
    margin: 20,
    alignSelf: 'center',
    padding: 20,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'lightblue'
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    paddingBottom: 50
  }
});

const MainView = styled.View`
  background-color: whitesmoke;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

// const WeatherRow = styled.View`
//   width: 100%;
//   justify-content: space-between;
//   display: flex;
//   align-items: center;
//   flex-direction: row;
//   flex-wrap: wrap;
// `;



const FavoriteBox = styled.TouchableOpacity`
  min-width: ${(props) => (props.width > props.height ? 80 : 100)}px;
  /* width: auto; */
  height: ${(props) => (props.width > props.height ? 20 : 25)}%;
  background-color: lightseagreen;
  display: flex;
  border-radius: 20px;
  elevation: 7;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  margin: 2px;
`;

