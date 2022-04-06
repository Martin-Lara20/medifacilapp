import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Account from "../screens/Account/Account"
import Login from "../screens/Account/Login"
import OptionRegister from "../screens/Account/OptionRegister"
import PharmacyRegister from '../screens/Account/Register/PharmacyRegister.js'
import UserRegister from "../screens/Account/Register/UserRegister"
import UserLogin from "../screens/Account/Login/UserLogin"
import PharmacyLogin from "../screens/Account/Login/PharmacyLogin"



const Stack = createStackNavigator()


export default function AccountStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='account'
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
             <Stack.Screen
                name = "UserRegister"
                component = {UserRegister}
                options = {{title: "Registro de usuario"}}
            />
            <Stack.Screen
                name = "userLogin"
                component = {UserLogin}
                options = {{title: "Login Usuario"}}
            />
            <Stack.Screen
                name = "pharmacyLogin"
                component = {PharmacyLogin}
                options = {{title: "Login Farmacia"}}
            />       
        </Stack.Navigator>
    )
}
   

    