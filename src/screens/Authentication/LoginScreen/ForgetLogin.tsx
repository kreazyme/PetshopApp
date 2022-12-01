import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Button, Text, Alert, ScrollView, TouchableOpacity, TextInput, StatusBar } from "react-native";
import { decreaseAction, increaseAction } from "../../../redux/actions";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../../shared/colors";
import FastImage from "react-native-fast-image";
import { img_login, SCREENNAME } from "../../../shared";
import BIcon from 'react-native-vector-icons/FontAwesome';
import { useTheme, ActivityIndicator } from "react-native-paper";

const ForgetPasswordComp = ({navigation}:any) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { colors } = useTheme();
    const [email, setEmail] = useState("");
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.txtLogin}>
                Login
            </Text>
            <View style={styles.wrapImage}>
                <FastImage
                    source={img_login}
                    style={styles.img}
                    resizeMode={"cover"}
                />
            </View>
            <Text style={styles.txtDetail}>Email</Text>
            <View style={styles.wrapBorderInput}  >
                <BIcon
                    name="user-o"
                    color={colors.text}
                    size={20}
                    style={{ marginLeft: 10 }}
                />
                <TextInput
                    style={styles.txtInput}
                    numberOfLines={1}
                    value={email}
                    placeholder={"Email"}
                    onChangeText={(value) => setEmail(value)}
                />
            </View>
            <Text style={styles.LableError}>A link to set a new password will be sent to your email address</Text>
            <TouchableOpacity>
                <View style={styles.wrapButtonLogin}>
                    {
                        isLoading ?
                            <ActivityIndicator
                                size={20}
                                color={"white"}
                            />
                            :
                            <Text style={styles.txtButtonLogin}>
                                Register
                            </Text>
                    }

                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate(SCREENNAME.LOGIN_SCREEN)}
                style={{ alignItems: "center" }}
            >
                <Text style={styles.txtDetailCreate}>You has account?
                    <Text style={styles.txtCreateAccount}>{" Login now"}</Text>
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
export const ForgetPassword = React.memo(ForgetPasswordComp)


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    txtLogin: {
        fontSize: 40,
        fontWeight: "bold",
        color: colors.cyan,
        marginTop: 30,
        alignSelf: "center",
    },
    wrapImage: {
        flexDirection: "row",
    },
    img: {
        marginHorizontal: 80,
        marginVertical: 20,
        aspectRatio: 1,
        flex: 1,
    },
    txtDetail: {
        fontSize: 18,
        color: "#05375a",
        marginHorizontal: 20,
        paddingBottom: 10,
        fontWeight: 'bold',
    },
    wrapBorderInput: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.cyan,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 24,
        alignItems: 'center'
    },
    txtInput: {
        flex: 1,
        fontSize: 20,
        color: colors.cyan,
        marginHorizontal: 10
    },
    wrapButtonLogin: {
        backgroundColor: colors.cyan,
        marginHorizontal: 50,
        marginTop: 20,
        borderRadius: 10,
        alignItems: "center",
        paddingVertical: 15,
    },
    txtButtonLogin: {
        fontSize: 20,
        color: colors.white,
        fontWeight: "bold",
    },
    txtDetailCreate: {
        fontSize: 16,
        color: "gray",
        marginVertical: 20,
    },
    txtCreateAccount: {
        fontSize: 16,
        color: colors.cyan,
        fontWeight: "bold",
    },
    LableError: {
        paddingTop: 30,
        fontSize: 18,
        marginLeft: 30
    },
    Header: {
        width: '100%',
        height: '20%',
        backgroundColor: 'white'
    },
    
})
