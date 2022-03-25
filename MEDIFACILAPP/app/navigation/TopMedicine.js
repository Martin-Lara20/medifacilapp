import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import TopMedicine from "../screens/TopMedicine"


const Stack = createStackNavigator()


export default function TopMedicineStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='TopMedicine'
                component={TopMedicine}
                options={{title:'Medicamentos mas comprados'}}
            />
        </Stack.Navigator>
    )
}
   

    