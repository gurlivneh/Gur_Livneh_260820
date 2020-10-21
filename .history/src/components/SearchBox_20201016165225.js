import React, {useState, useEffect} from 'react';
import {Text, Dimensions, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import * as Actions from '../state/actions';
import Autocomplete from 'react-native-autocomplete-input';
import * as MockData from '../mockData/mockData';
import {useDispatch, useSelector} from 'react-redux';
const isMock = true

const SearchBox = (props) => {
  const [keyword, setKeyword] = useState();
  const [autoCompleteRes, setAutoCompleteRes] = useState([]);
  const dispatch = useDispatch();
  const isDark = useSelector(
    (state) => state.reducer.isDark,
    () => {},
  );
  const selectCity = (key, city) => {
    dispatch(Actions.sendCitySelection(key, city));
  };

  const handleTextChange = (text) => {
    console.log('auto complete res', autoCompleteRes, 'text to send', text);
    setKeyword(text);
    if (isMock) {
      if (text.length > 0) {
        setAutoCompleteRes(MockData.autocompleteKeyLocationRes);
      } else {
        setAutoCompleteRes([]);
      }
    } else {
      if (text.length > 0) {
        Actions.getAutoComplete(text).then((res) => {
          if (res.Code) {
            dispatch(Actions.setError(res.Message));
          } else {
            setAutoCompleteRes(res);
          }
        });
      } else {
        setAutoCompleteRes([]);
      }
    }
  };

  return (
    <>
      <MainView isLandscape={props.isLandscape}>
        <MyAutoComplete
          isDark={isDark}
          data={autoCompleteRes}
          defaultValue={keyword}
          placeholder="city"
          listContainerStyle={{height: props.isLandscape ? 50 : 70}}
          onChangeText={(text) => handleTextChange(text)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setAutoCompleteRes([]);
                setKeyword(item.LocalizedName);
                selectCity(item.Key, item.LocalizedName);
              }}>
              <Title>{item.LocalizedName}</Title>
            </TouchableOpacity>
          )}
        />
      </MainView>
    </>
  );
};

export default SearchBox;

const MainView = styled.View`
  width: 220px;
  height: ${(props) => (props.isLandscape ? 90 : 65)}%;
`;

const MyAutoComplete = styled(Autocomplete)`
  height: 40px;
  background-color: lightskyblue;
`;

const Title = styled.Text`
color: ${(props) => (props.isDark ?  "white" : "black" )};
`;