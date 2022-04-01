import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Account from "../screens/Account/Account"
import Login from "../screens/Account/Login"
import UserRegister from "../screens/Account/Register/UserRegister"

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
                name = "UserRegister"
                component = {UserRegister}
                options = {{title: "Registro de usuario"}}
            />    
        </Stack.Navigator>
    )
}
   

    