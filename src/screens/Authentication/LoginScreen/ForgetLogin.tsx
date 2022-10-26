import React from "react";
import { View, StyleSheet, Dimensions, Button, Text, Alert, ScrollView, TouchableOpacity, TextInput, StatusBar } from "react-native";
import { decreaseAction, increaseAction } from "../../../redux/actions";
import Icon from "react-native-vector-icons/AntDesign";
const windownWidth = Dimensions.get('window').width;

const ForgetSignInComp = () => {

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <HeaderComponent />
            </View>
            <View style={styles.Body}>
                <BodyComponent />
            </View>
            <View >
                <EndComponent />
            </View>
        </View>
    );
}
export const ForgetSignIn = React.memo(ForgetSignInComp)
const HeaderComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.ViewSignIn} >
                <Text style={styles.LableSignIn}>Sign in</Text>
                <View style={{ flex: 1 }} />
                <TouchableOpacity >
                    <View style={{ marginRight: 20 }} >
                        <Icon name="close" size={25} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const BodyComponent = () => {
    return (
        <View style={styles.containerJust}>
            <Text style={styles.TextLogin}>Email address *</Text>
            <View style={styles.LabelEmail}>
                <TextInput style={styles.InputEmail} placeholder="Email" />
            </View>
            <Text style={styles.LableError}>A link to set a new password will be sent to your email address</Text>
            
            <TouchableOpacity style={styles.ButtonLogin}>
                <Text style={{ color: 'white', fontSize: 16 }}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}
const EndComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.ViewEnd}>
                <View style={styles.ViewG}></View>
                <View style={styles.ViewG}></View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{}}>
                    <Text style={{ color: 'black', }}>No account yet? Create an Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    Header: {
        width: '100%',
        height: '20%',
        backgroundColor: 'white'
    },
    Body: {
        height: '45%',
        width: '100%',
    },
    containerJust: {
        height: '100%', 
        width: '100%', 
        justifyContent: 'center'
    },
    ViewSignIn: {
        height: 70,
        width: "100%",
        marginTop: 70,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#F6F5F5',
        flexDirection: "row"
    },
    LableSignIn: {
        fontSize: 28,
        color: 'black',
        paddingHorizontal: 20
    },
    TextLogin: {
        fontSize: 20, 
        marginLeft: 30,
    },
    LabelEmail: {
        width: windownWidth - 60, 
        height: 50, 
        marginTop: 20,
        marginLeft: 30, 
        borderWidth: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderRadius: 150 / 2
    },
    InputEmail:{
        height: '100%', 
        flex: 1, 
        fontSize: 23, 
        padding: 10
    },
    LableError: {
        paddingTop: 30, 
        fontSize: 18, 
        marginLeft: 30
    },
    ButtonLogin: {
        height: 50,
        width: windownWidth - 60, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#5250A4', 
        marginLeft: 30, 
        marginTop: 10, 
        borderRadius: 100
    },
    ViewEnd: {
        height: 40, 
        width: windownWidth - 60, 
        marginLeft: 30, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    ViewG: {
        height: 1, 
        width: '30%', 
        backgroundColor: '#CFCFCF'
    }
})
