import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Maps from "../screens/Maps"

const Stack = createStackNavigator()


export default function MapsStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Maps'
                component={Maps}
                options={{title:'Mapa de farmacias'}}
            />
        </Stack.Navigator>
    )
}
   

    