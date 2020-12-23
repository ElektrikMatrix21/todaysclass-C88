import react from 'react'
import {CreateStackNavigator} from 'react-navigation-stack'

import BookDonateScreen from '../screens/BookDonateScreen'
import RecieverDetailsScreen from '../screens/RecieverDetailsScreen'

export const AppStackNavigator = createStackNavigator({
    BookDonateList: {
        screen: BookDonateScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    RecieverDetails: {
        screen: RecieverDetailsScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    },
    {
      initialRouteName: "BookDonateList"  
})