import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Main from '../screens/Main'
import Favorites from '../screens/Favorites'
import store from '../';



const AppNavigator = createAppContainer(createSwitchNavigator({
    Main,
    Favorites 

}, {
        headerMode: 'none',
        swipeEnabled: false,
        gesturesEnabled: false,
  }) );

const AppWithNavigationState = () => {

        return (<AppNavigator store={store}/>)
      
}

export default AppWithNavigationState




  
  

