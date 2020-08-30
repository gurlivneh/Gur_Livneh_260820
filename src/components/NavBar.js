import React from 'react';
import styled from 'styled-components/native';

const NavBar = (props) => {
  return (
    <>
      <MainView>
        <ButtonsView>
          <ButtonText
            onPress={() => props.handleNav('Home')}
            selected={props.page === 'Home' ? true : false}>
            Home
          </ButtonText>
          <ButtonText
            onPress={() => props.handleNav('Favorites')}
            selected={props.page === 'Favorites' ? true : false}>
            Favorites
          </ButtonText>
        </ButtonsView>
      </MainView>
    </>
  );
};

export default NavBar;

export const MainView = styled.View`
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: flex-end;
  display: flex;
  flex-direction: row;
  background-color: white;
`;

export const ButtonsView = styled.View`
  width: 200px;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 5px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.selected ? '#1da1f2' : 'lightblue')};
`;
