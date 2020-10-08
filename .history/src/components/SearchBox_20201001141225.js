import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import * as Actions from '../state/actions';
import Autocomplete from 'react-native-autocomplete-input';
import * as MockData from '../mockData/mockData';
import {useDispatch, useSelector} from 'react-redux';


const isMock = true;
const Main = () => {
  const [keyword, setKeyword] = useState();
  const [autoCompleteRes, setAutoCompleteRes] = useState([]);
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [width, setWidth] = useState(Dimensions.get('window').width);


  const error = useSelector(
    (state) => state.reducer.error,
    () => {},
    );
    
  const dispatch = useDispatch();

  const handleTextChange = (text) => {
    console.log("auto complete res", autoCompleteRes, "text to send", text)
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
        <MainView height={height} width={width}>
          <SearchView>
            <MyAutoComplete
              data={autoCompleteRes}
              defaultValue={keyword}
              placeholder="city"
              listContainerStyle={{height: 70}}
              onChangeText={(text) => handleTextChange(text)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setAutoCompleteRes([]);
                    setKeyword(item.LocalizedName);
                    selectCity(item.Key, item.LocalizedName);
                  }}>
                  <Text>{item.LocalizedName}</Text>
                </TouchableOpacity>
              )}
            />
          </SearchView>
        </MainView>
      </SafeAreaView>
    </>
  );
};

export default Main;

const MainView = styled.View`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`;
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
const FavoriteButton = styled.TouchableOpacity`
  width: 50px;
  height: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (!props.isFavorite ? 'yellowgreen' : 'red')};
  display: flex;
  border-radius: 30px;
  elevation: 5;
  margin-left: 5px;
`;
const WeatherView = styled.View`
  width: 100%;
  display: flex;
  height: 55%;
`;
const WeatherRow = styled.View`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: row;
  padding: 10px;
  flex-wrap: wrap;
`;
const SearchView = styled.View`
  width: 60%;
  flex-direction: row;
  padding: 10px;
  max-height: 20%;
`;
const MyAutoComplete = styled(Autocomplete)`
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: lightskyblue;
  display: flex;
`;
