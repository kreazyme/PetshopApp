import React from "react";
import { View, StyleSheet, Dimensions, Button, Text, Alert, ScrollView, TouchableOpacity, TextInput, StatusBar } from "react-native";
import { decreaseAction, increaseAction } from "../../../redux/actions";
import Icon from "react-native-vector-icons/AntDesign";
const windownWidth = Dimensions.get('window').width;
const LoginScreenComp = () => {

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
export const LoginScreen = React.memo(LoginScreenComp)
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
            <Text style={styles.TextLogin}>Login in your account</Text>
            <View style={styles.LabelEmail}>
                <TextInput style={styles.InputEmail} placeholder="Email" />
            </View>
            <View style={styles.LabelEmail}>
                <TextInput style={styles.InputEmail} placeholder="Passord" />
            </View>
            <View style={styles.TextForget}>
                <TouchableOpacity style={{ position: 'absolute', right: 0 }}>
                    <Text style={{ color: 'black', }}>Forget password?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.ButtonLogin}>
                <Text style={{ color: 'white', fontSize: 16 }}>Login</Text>
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
        fontSize: 24,
        marginLeft: 30,
    },
    LabelEmail: {
        width: windownWidth - 60,
        height: 45, marginTop: 20,
        marginLeft: 30,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 150 / 2,
    },
    InputEmail: {
        height: '100%',
        flex: 1,
        fontSize: 20,
        padding: 10
    },
    TextForget: {
        width: windownWidth - 60,
        height: 30,
        marginTop: 20,
        marginLeft: 30,
        flexDirection: 'row',
        alignItems: 'center'
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


{/* <View style={{ height: 50, flexDirection: 'row', backgroundColor: 'white' }}>
                <TouchableOpacity style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => { setPage(SIGN_IN) }}
                    disabled={page === SIGN_IN ? true : false}>
                    <Text style={styles.textTitle}>Sign In</Text>
                    {page === SIGN_IN ? <View style={{ position: 'absolute', bottom: 0, height: 3, width: '100%', backgroundColor: 'black' }}></View> : null}
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => { setPage(REGISTER) }}
                    disabled={page === REGISTER ? true : false}>
                    <Text style={styles.textTitle}>Register</Text>
                    {page === REGISTER ? <View style={{ position: 'absolute', bottom: 0, height: 3, width: '100%', backgroundColor: 'black' }}></View> : null}
                </TouchableOpacity>
            </View> */}