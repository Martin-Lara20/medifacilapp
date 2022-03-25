import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Pharmacy from "../screens/Pharmacy"
import Maps from "../screens/Maps"
import Search from "../screens/Search"
import Account from "../screens/Account"


const Tab = createBottomTabNavigator()
import TopMedicine from "../screens/TopMedicine"

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen 
                    name = 'pharmacy'
                    component= {Pharmacy}
                    options= {{title:'Farmacias'}}
                />
                  <Tab.Screen 
                    name = 'maps'
                    component= {Maps}
                    options= {{title:'Maps'}}
                />
                  <Tab.Screen 
                    name = 'search'
                    component= {Search}
                    options= {{title:'Buscar'}}
                />
                  <Tab.Screen 
                    name = 'topMedicine'
                    component= {TopMedicine}
                    options= {{title:'Top 5'}}
                />
                  <Tab.Screen 
                    name = 'account'
                    component= {Account}
                    options= {{title:'Cuenta'}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

