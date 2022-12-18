import React, { useState } from "react";
import { View, StyleSheet, FlatList, TextInput, Text, TouchableOpacity, ScrollView } from "react-native";
import { fonts, SCREENNAME } from "../../shared";
import colors from "../../shared/colors";
import Icon from "react-native-vector-icons/MaterialIcons"
import BlackIcon from "react-native-vector-icons/FontAwesome"
import DeIcon from "react-native-vector-icons/FontAwesome5"
import { AppHeader } from "../Header";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { SAVE_APP_TOKEN } from "../../redux/actions/actionTypes";

export default () => {
    const renderBody = (() => {
        const navigation = useNavigation<any>();
        const dispatch = useDispatch<any>();
        return (
            <ScrollView>
                <View style={styles.containerBody}>
                    <View style={styles.wrapHome}>
                        <Text style={styles.TextAccount}>My account</Text>
                        <Text style={styles.TextHome}>Home / My account</Text>

                    </View>
                    <View style={styles.wrapBody}>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate(SCREENNAME.PROFILE_PAGE) }}
                            style={styles.wrapButton}>
                            <Text style={styles.ButtonText}>Person</Text>
                            <View style={styles.container}></View>
                            <Icon name="person" style={styles.ButtonIcon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.wrapButton}>
                            <Text style={styles.ButtonText}>Dasdboard</Text>
                            <View style={styles.container}></View>
                            <Icon name="dashboard" style={styles.ButtonIcon} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.wrapButton}
                            onPress={() => {
                                navigation.navigate(SCREENNAME.HISTORY_SCREEN)
                            }}
                        >
                            <Text style={styles.ButtonText}>Orders</Text>
                            <View style={styles.container}></View>
                            <DeIcon name="border-all" style={styles.ButtonIcon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.wrapButton}>
                            <Text style={styles.ButtonText}>Downloads</Text>
                            <View style={styles.container}></View>
                            <BlackIcon name="download" style={styles.ButtonIcon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.wrapButton}>
                            <Text style={styles.ButtonText}>Addresses</Text>
                            <View style={styles.container}></View>
                            <DeIcon name="map-marked-alt" style={styles.ButtonIcon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.wrapButton}>
                            <Text style={styles.ButtonText}>Account details</Text>
                            <View style={styles.container}></View>
                            <Icon name="account-box" style={styles.ButtonIcon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.wrapButton} onPress={() => {
                            dispatch({
                                type: SAVE_APP_TOKEN,
                                payload: ""
                            })
                            navigation.reset({
                                index: 0,
                                routes: [
                                    {
                                        name: SCREENNAME.LOGIN_SCREEN,
                                    },
                                ],
                            })
                        }}>
                            <Text style={styles.ButtonText}>Logout</Text>
                            <View style={styles.container}></View>
                            <Icon name="logout" style={styles.ButtonIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    })

    return (
        <View style={styles.container} >
            <AppHeader />
            {renderBody()}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    containerBody: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        //justifyContent: 'center',
        //borderWidth:1,
    },
    wrapHome: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7F7F7',
        //borderWidth:1,
    },
    TextAccount: {
        fontSize: 32,
        color: 'black',
        fontWeight: 'bold',
    },
    TextHome: {
        paddingTop: 5,
        fontSize: 12,
    },
    wrapBody: {
        width: '100%',
        height: '80%',
        //borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    wrapButton: {
        width: 314, height: 50, flexDirection: 'row',
        backgroundColor: '#F7F7F7',
        //borderWidth: 1,
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginVertical: 7,
    },
    ButtonText: {
        fontSize: 18,
        color: 'black',
        marginLeft: 10,
    },
    ButtonIcon: {
        marginRight: 10,
        alignItems: 'center',
        fontSize: 18,
        color: 'black'
    },
    wrapHeader: {
        padding: 30,
        height: 160,
        justifyContent: "center",
        backgroundColor: colors.cyan
    },
    wrapLogo: {
        height: 38,
        width: 165
    },
    wrapHeaderLogo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
    },
    wrapMenu: {
        height: 25,
        aspectRatio: 1,
    },
    wrapSearch: {
        height: 25,
        aspectRatio: 1,
        marginRight: 20
    },
    wrapSearchBox: {
        backgroundColor: colors.white,
        borderRadius: 20,
        marginTop: 20,
        height: 50,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    txtSearch: {
        fontSize: fonts.font20,
        paddingHorizontal: 20
    }
});

