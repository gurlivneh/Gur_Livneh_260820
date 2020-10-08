import React from 'react';
import styled from 'styled-components/native';
import * as Images from '../images/index'


const ForecastBox = (props) => {
  let date = props.item.Date.split("T")
  const [iconImage, setIconImage] = useState();
  const weatherIcon = props.currentWeather.WeatherIcon

  useEffect(() => {
    Images.iconsArray.forEach((item => {
      if (item.code === weatherIcon) {
        setIconImage(item.path)
      }
    }))
  },[weatherIcon]);

  return (
    <>
      <MainView height={props.height} width={props.width}>
        <ForecastText>
          {props.item.Temperature.Maximum.Value + props.item.Temperature.Maximum.Unit}
        </ForecastText>
        <ForecastText>{props.item.Day.IconPhrase}</ForecastText>
        <ForecastText>{date[0]}</ForecastText>
        <Logo source={iconImage} />
      </MainView>
    </>
  );
};

export default ForecastBox;


 const MainView = styled.View`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
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

const Logo = styled.Image`
  margin:5px;

`;