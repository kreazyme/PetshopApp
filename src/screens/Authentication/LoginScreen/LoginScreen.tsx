import React from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { ActivityIndicator } from "react-native-paper";
import colors from "../../../shared/colors";
import { SCREENNAME } from "../../../shared";
import { useDispatch } from "react-redux";
import { SAVE_APP_TOKEN } from "../../../redux/actions/actionTypes";
const LoginScreenComp = ({ navigation }: any) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const dispatch = useDispatch();

    const handleLogin = (async () => {
        setIsLoading(true);
        var body = JSON.stringify({
            email: "user11@gmail.com",
            password: "123456"
        })
        await fetch('https://petshopdut.herokuapp.com/user/login',
            {
                method: "POST",
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    "Connection": "keep-alive"
                },
                body: body,
            }
        ).finally(() => {
            setIsLoading(false);
        }).then(response => response.json())
            .then((response,) => {
                if (response.status === 400) {
                    showPopup();
                }
                else {
                    dispatch({
                        type: SAVE_APP_TOKEN,
                        payload: response.accesstoken
                    })
                    navigation.navigate(SCREENNAME.HOME_STACK)
                }
            })
            .catch((error) => {
                console.error(error);
            });

        setIsLoading(false);
    })

    const showPopup = () => {
        Alert.alert(
            "Login Failed",
            "Try another password or username",
            [
                { text: "OK" }
            ]
        );
    }

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
                    <TextInput
                        onChangeText={(text) => setEmail(text)}
                        style={styles.InputEmail}
                        value={email}
                        placeholder="Email" />
                </View>
                <View style={styles.LabelEmail}>
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.InputEmail}
                        placeholder="Passord" />
                </View>
                <View style={styles.TextForget}>
                    <TouchableOpacity style={{ position: 'absolute', right: 0 }}>
                        <Text style={{ color: 'black', }}>Forget password?</Text>
                    </TouchableOpacity>
                </View>
                {
                    isLoading
                        ?
                        <View style={styles.wrapLoading}>
                            <ActivityIndicator
                                color={colors.cyan}
                            />
                        </View>
                        :
                        <TouchableOpacity
                            onPress={() => {
                                handleLogin();
                            }}
                            style={styles.ButtonLogin}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Login</Text>
                        </TouchableOpacity>
                }
            </View >
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
        marginHorizontal: 30,
        height: 45, marginTop: 20,
        marginLeft: 30,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 150 / 2,
    },
    InputEmail: {
        flex: 1,
        fontSize: 20,
        padding: 10
    },
    TextForget: {
        marginHorizontal: 30,
        height: 30,
        marginTop: 20,
        marginLeft: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    ButtonLogin: {
        height: 50,
        marginHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5250A4',
        marginLeft: 30,
        marginTop: 10,
        borderRadius: 100
    },
    ViewEnd: {
        height: 40,
        marginHorizontal: 30,
        marginLeft: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ViewG: {
        height: 1,
        width: '30%',
        backgroundColor: '#CFCFCF'
    },
    wrapLoading: {
        margin: 5,
        width: 30,
        justifyContent: "center",
        alignSelf: "center",
    }
})
