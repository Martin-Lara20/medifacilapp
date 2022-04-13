import React, { useState } from "react";
import {ListItem, Icon} from 'react-native-elements';
import { StyleSheet, View, Text } from "react-native";
import { Modal } from "../../Modal";
import ChageDisplayNameUserForm from "./ChangeDisplayNameUserForm"; 
import ChangeDisplayEmailUserForm from "./ChangeDisplaEmailUserForm";
import ChangeDisplayPasswordForm from './ChangeDisplayPasswordUserForm'

export default function AccountOption(props){
    const {userInfo, toastRef, setReloadUserInfo} = props
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] =useState(null)
    console.log(userInfo)
    const selectedComponent = (key) => {
        switch(key){
            case 'displayName':
                setRenderComponent(
                    <ChageDisplayNameUserForm
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo = {setReloadUserInfo}
                    />
                )
                setShowModal(true)
                break
            
            case 'displayEmail':
                setRenderComponent(
                    <ChangeDisplayEmailUserForm
                    email={userInfo.email}
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                    setReloadUserInfo = {setReloadUserInfo}
                />
                )
                setShowModal(true)
                break
            
            case 'displayPassword':
                setRenderComponent(<ChangeDisplayPasswordForm  
                    setShowModal={setShowModal}
                    toastRef={toastRef}                      
                />)
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