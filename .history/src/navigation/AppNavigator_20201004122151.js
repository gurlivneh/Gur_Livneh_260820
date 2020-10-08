/* eslint-disable prettier/prettier */
import React from 'react'
import { connect } from 'react-redux'
import Home from 'screens/Home'
import Login from 'screens/Login'
import Calibrate from 'screens/Calibrate'
import ConnectToBt from 'screens/ConnectToBt'
import ConnectToBLE from 'screens/ConnectToBLE'
import AnalyzeDetails from 'screens/AnalyzeDetails'
import Mode from 'screens/Mode'
import Analyze from 'screens/Analyze'
import Results from 'screens/Results'
import TakePicture from 'screens/TakePicture'
import SoftwareUpdate from 'screens/SoftwareUpdate'
import MyCamera from 'components/MyCamera'
import ErrorMsg from 'components/ErrorMsg'
import MyModal from 'components/MyModal'
import AnimationMsg from 'components/AnimationMsg'
import ProgresBar from 'components/ProgresBar'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'



// const OverviewStack = createStackNavigator({
//     Overview
// },{tabBarLabel:"Overview"})
// const MonthlyStack = createStackNavigator({
//     Monthly
// },{tabBarLabel:"Monthly"})
// const ProgramStack = createStackNavigator({
//     Program
// },{tabBarLabel:"Program"})


// const TabNavigator = createMaterialTopNavigator({
//     OverviewStack,
//     ProgramStack,
//     MonthlyStack
// });

// export const NavCompat = {
//     navigate: (props, screen, params = {}, replace = false) => {
//         if (props.navigator) {
//             props.navigator.push({
//                 name: screen,
//                 params: params
//             })
//         } else {
//             if (replace) {
//                 props.navigation.replace(screen,{params: params})
//             } else {
//                 props.navigation.navigate(screen,{params: params})
//             }
//         }
//     },
//     replace: (props, screen, params = {}) => {
//         if (props.navigator) {
//             props.navigator.push({
//                 name: screen,
//                 params: params
//             })
//         } else {
//             props.navigation.replace(screen,{params: params})
//         }
//     },
//     goBack: (props) => {
//         if (props.navigator) {
//             props.navigator.pop()
//         } else {
//             props.navigation.goBack()
//         }
//     }
// }


export const AppNavigator = createAppContainer(createSwitchNavigator({
    
    //AnalyzeDetails,
    //SoftwareUpdate,
    //ConnectToBt,
    //TakePicture,
    //Calibrate,
    //Results,
    //MyCamera,
    //Mode,
    Home,
    Login,
    SoftwareUpdate,
    //ConnectToBt,
    ConnectToBLE,
    Mode,
    AnalyzeDetails,
    Calibrate,
    TakePicture,
    Analyze,
    Results,
    MyModal,
    MyCamera,
    ProgresBar
}, {
        headerMode: 'none',
        swipeEnabled: false,
        gesturesEnabled: false,
  }) );

//console.log(AppNavigator.router)


class AppWithNavigationState extends React.Component {
 


    getNavigation = () => this._navigator
  
  
    render() {
    
        let { dispatch, nav, store, showMsg } = this.props

        console.log("rendered navigator",this._navigator, nav)
  
        return <AppNavigator 
            ref={navigator => this._navigator = navigator} 
            store={store}
            
            onNavigationStateChange={(prevState, currentState, action) => {
    
                let reduxState = store.getState()
                console.log("app navigator route change", action, reduxState)
        
                if (action.type === "Navigation/NAVIGATE") {
                    // if (action.routeName ===  "Cart") {
        
                    //   let { cart, cartId } = reduxState.userReducer
                    //   if (cartId && cart) {
                    //     Analytics.eatsViewCart(cartId, Utils.getCartPrice(cart), Utils.getCartNumberOfItems(cart))
                    //   }
                    // }
                }
            }}
        />
      
    }
}
  
  
const mapStateToProps = state => ({
    nav: state.nav,
});
  
const ReduxNavigator = connect(mapStateToProps, null, null, {forwardRef: true})(AppWithNavigationState);
  
  

export default ReduxNavigator
