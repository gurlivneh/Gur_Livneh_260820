import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Main from '../screens/Main'
import Favorites from '../screens/Favorites'


const AppNavigator = createAppContainer(createSwitchNavigator({
    Main,
    Favorites 

}, {
        headerMode: 'none',
        swipeEnabled: false,
        gesturesEnabled: false,
  }) );

export const AppWithNavigationState = () => {

        return (<AppNavigator store={store}/>)
      
}




  
  

