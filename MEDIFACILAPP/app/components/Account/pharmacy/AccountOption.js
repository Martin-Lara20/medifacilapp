import React, { useState } from "react";
import {ListItem, Icon} from 'react-native-elements';
import { StyleSheet, View, Text } from "react-native";
import { Modal } from "../../Modal";
/* import ChageDisplayNameForm from "./ChangeDisplayNameForm"; */

export default function AccountOption(props){
    const {userInfo, toastRef, setReloadUserInfo} = props
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] =useState(null)
    console.log(userInfo)
    const selectedComponent = (key) => {
        switch(key){
            case 'displayName':
                setRenderComponent(
                    <Text>Cambiando nombre</Text>
                )
                setShowModal(true)
                break
            
            case 'displayEmail':
                setRenderComponent(<Text>Cambiando Email</Text>)
                setShowModal(true)
                break
            
            case 'displayPassword':
                setRenderComponent(<Text>Cambiando password</Text>)
                setShowModal(true)
                break
            default:
                setRenderComponent(null)
                setShowModal(false)
                break

        }

    }

    const menuOptions = generatedOptions(selectedComponent)

    return(
        <View>
            {menuOptions.map((menu, index) => (
                <ListItem key={index} bottomDivider onPress={menu.onPress}>
                    <Icon name = {menu.iconNameLeft} />
                    <ListItem.Content>
                        <ListItem.Title>{menu.title}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            ))}

            {renderComponent && (
            <Modal isVisible ={showModal} setIsVisible={setShowModal}>
                {renderComponent}
            </Modal>
            )}
        </View>
        /* Si renderComponent tiene un valor y no es nulo, entonces pasa a renderizar al Modal*/
    )
}

function generatedOptions(selectedComponent){
    return[
        {
            title: 'Cambiar nombre y apellidos',
            iconNameLeft: 'account-circle',
            onPress: () => selectedComponent('displayName')
        },
        {
            title: 'Cambiar email',
            iconNameLeft: 'drafts',
            onPress: () => selectedComponent('displayEmail')
        },
        {
            title: 'Cambiar password',
            iconNameLeft: 'lock',
            onPress: () => selectedComponent('displayPassword')
        }
    ]
}

