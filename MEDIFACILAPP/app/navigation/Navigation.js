import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import {Icon} from 'react-native-elements'

//import Pharmacy from "../screens/Pharmacy"
import PharmacyStack from "./PharmacyStacks"
//import Maps from "../screens/Maps"
import MapsStack from "./MapsStacks"
//import Search from "../screens/Search"
import SearchStack from "./SearchStacks"
//import Account from "../screens/Account"
import AccountStack from "./AccountStacks"
//import TopMedicine from "../screens/TopMedicine"
import TopMedicineStack from "./TopMedicine"

const Tab = createBottomTabNavigator()


export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName="search"
            tabBarOptions={{
                 inactiveTintColor: '#665c5b',
                 activeTintColor: '#d6210f'
            }}
            screenOptions = {({route}) => ({
                  tabBarIcon:({color}) => screenOptions (route, color)
            })} 
            
            
            >

                <Tab.Screen 
                    name = 'pharmacy'
                    component= {PharmacyStack}
                    options= {{title:'Farmacias'}}
                />
                  <Tab.Screen 
                    name = 'maps'
                    component= {MapsStack}
                    options= {{title:'Mapa'}}
                />
                  <Tab.Screen 
                    name = 'search'
                    component= {SearchStack}
                    options= {{title:'Buscar'}}
                />
                  <Tab.Screen 
                    name = 'topMedicine'
                    component= {TopMedicineStack}
                    options= {{title:'Top 5'}}
                />
                  <Tab.Screen 
                    name = 'account'
                    component= {AccountStack}
                    options= {{title:'Cuenta'}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function screenOptions(route, color){
  let iconName
  switch (route.name) {
    case 'pharmacy':
      iconName='bottle-tonic-plus'
      break
    case 'maps':
      iconName='map-search-outline'
      break
    case 'search':
      iconName='card-search'
      break
    case 'topMedicine':
      iconName='medical-bag'
      break
    case 'account':
      iconName='account-heart'
       break
  }
  return(
    <Icon type='material-community' name={iconName} size={22} color={color}/>
  )
}
