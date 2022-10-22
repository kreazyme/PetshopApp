import React from "react";
import { View, StyleSheet, Dimensions, Button, Text, Alert, ScrollView, TouchableOpacity, TextInput, StatusBar } from "react-native";
import { decreaseAction, increaseAction } from "../../../redux/actions";

const windownWidth = Dimensions.get('window').width;
const SIGN_IN = 'SIGN_IN';
const REGISTER = 'REGISTER';
const LoginScreenComp = () => {
    const [page, setPage] = React.useState(SIGN_IN);
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <View style={{ width: '100%', height: '25%'}}>
                <HeaderComponent page={page} setPage={setPage} />
            </View>
            <View style={{ height: '45%', width: '100%' }}>
                {page === SIGN_IN ? <BodyComponent1 /> : <BodyComponent2/>}
            </View>
            <View style={{ flex: 1 }}>
                <EndComponent />
            </View>
        </View>

    );
}
export const LoginScreen = React.memo(LoginScreenComp)
const EndComponent = () => {
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <View style={{ height: 40, width: windownWidth - 60, marginLeft: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: 1, width: '30%', backgroundColor: '#CFCFCF' }}></View>
                <View style={{ height: 1, width: '30%', backgroundColor: '#CFCFCF' }}></View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{}}>
                    <Text style={{ color: 'black', }}>No account yet? Create an Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const BodyComponent2 = () => {
    const [email, setEmail] = React.useState('');
    return (
        <View style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, marginLeft: 30 }}>Email address *</Text>
            <View style={{ width: windownWidth - 60, height: 50, marginTop: 20, marginLeft: 30, borderWidth: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 150 / 2 }}>
                <TextInput style={{ height: '100%', flex: 1, fontSize: 25, padding: 10 }} placeholder="Email" />
            </View>
            <Text style={{paddingTop:30, fontSize: 18, marginLeft: 30 }}>A link to set a new password will be sent to your email address</Text>
            <TouchableOpacity style={{ height: 50, width: windownWidth - 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5250A4', marginLeft: 30, marginTop: 10, borderRadius: 100 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}
const BodyComponent1 = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    return (
        <View style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, marginLeft: 30 }}>Login in your account</Text>
            <View style={{ width: windownWidth - 60, height: 45, marginTop: 20, marginLeft: 30, borderWidth: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 150 / 2 }}>
                <TextInput style={{ height: '100%', flex: 1, fontSize: 20, padding: 10 }} placeholder="Email" />
            </View>
            <View style={{ width: windownWidth - 60, height: 45, marginTop: 20, marginLeft: 30, borderWidth: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 150 / 2 }}>
                <TextInput style={{ height: '100%', flex: 1, fontSize: 20, padding: 10 }} placeholder="Passord" />
            </View>
            <View style={{ width: windownWidth - 60, height: 30, marginTop: 20, marginLeft: 30, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ position: 'absolute', right: 0 }}>
                    <Text style={{ color: 'black', }}>Forget password?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ height: 50, width: windownWidth - 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5250A4', marginLeft: 30, marginTop: 10, borderRadius: 100 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}
const HeaderComponent = ({ page, setPage }: any) => {
    return (
        <View style={styles.container}>
            <View style={{ height: 50, flexDirection: 'row', backgroundColor: 'white' }}>
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
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        //paddingLeft: 30,

        backgroundColor: '#F6F5F5',},
        textTitle: {
            fontSize: 30,
            color: 'black',
        },

    })