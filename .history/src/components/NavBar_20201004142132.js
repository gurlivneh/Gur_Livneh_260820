import React from 'react';
import styled from 'styled-components/native';


const NavBar = (props) => {
  return (
    <>
      <MainView>
        <ButtonsView>
          <ButtonText
            onPress={() => props.navigation.navigate('Main')}
            selected={true}>
            Home
          </ButtonText>
          <ButtonText
            onPress={() => props.navigation.navigate('Favorites')}
            selected={ true }>
            Favorites
          </ButtonText>
        </ButtonsView>
      </MainView>
    </>
  );
};

export default NavBar;

 const MainView = styled.View`
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: flex-end;
  display: flex;
  flex-direction: row;
  background-color: white;
`;

 const ButtonsView = styled.TouchableOpacity`
  width: 200px;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 5px;
`;

 const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.selected ? '#1da1f2' : 'lightblue')};
`;
