import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Pharmacy from "../screens/Medicamentos/Pharmacy"

const Stack = createStackNavigator()


export default function PharmacyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Pharmacy'
                component={Pharmacy}
                options={{title:'Farmacias en tu zona'}}
            />
        </Stack.Navigator>
    )
}
   

    