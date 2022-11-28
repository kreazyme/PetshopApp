import React from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper'
const StartScreenComp = () => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <Icon
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                    />
                </View>

                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Password</Text>

                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Password"
                        style={styles.textInput}
                        autoCapitalize="none"
                    />
                </View>
                <TouchableOpacity>
                    <Text style={{ color: '#5250A4', marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                    >
                        <Text>
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Sign In</Text>
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.signIn, {
                            borderColor: '#5250A4',
                            borderWidth: 1,
                            marginTop: 15,
                            backgroundColor: '#FFFFFF'
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#5250A4'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

export const StartScreen = React.memo(StartScreenComp)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3F3C9A'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    textInput: {
        flex: 1,
        marginTop: -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },

    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#5250A4"
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});