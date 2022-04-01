import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Account from "../screens/Account/Account"
import Login from "../screens/Account/Login"
import OptionRegister from "../screens/Account/OptionRegister"
import PharmacyRegister from '../screens/Account/Register/PharmacyRegister.js'

const Stack = createStackNavigator()


export default function AccountStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Account'
                component={Account}
                options={{title:'Cuenta'}}
            />
            <Stack.Screen
                name = "login"
                component = {Login}
                options = {{title: "Inicie Sesión"}}
            />
            <Stack.Screen
                name = "option"
                component = {OptionRegister}
                options = {{title: "Registro"}}
            />
            <Stack.Screen
                name = "pharmacyRegister"
                component = {PharmacyRegister}
                options = {{title: "Registrar Farmacia"}}
            />                 
        </Stack.Navigator>
    )
}
   

    