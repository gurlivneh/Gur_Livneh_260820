import React from 'react';
import styled from 'styled-components/native';

const ForecastBox = (props) => {
    let date = props.item.Date.split("T")

  return (
    <>
      <MainView height={props.height} width={props.width}>
        <ForecastText>
          {props.item.Temperature.Maximum.Value + props.item.Temperature.Maximum.Unit}
        </ForecastText>
        <ForecastText>{props.item.Day.IconPhrase}</ForecastText>
        <ForecastText>{date[0]}</ForecastText>
      </MainView>
    </>
  );
};

export default ForecastBox;


 const MainView = styled.View`
  width: ${props => props.width > props.height ? 15 : 27}%;
  height: ${props => props.width > props.height ? 40 : 55}%;
  justify-content: center;
  align-items: center;
  background-color: white;
  display: flex;
  margin: 5px;
  border-radius: 20px;
  elevation: 20;
`;

 const ForecastText = styled.Text`
  font-size: 12px;
  text-align:center;
`;