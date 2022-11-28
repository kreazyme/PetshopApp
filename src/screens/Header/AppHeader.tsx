import React, { useRef, useState } from "react";
import { View, StyleSheet, Text, TextInput, Button, Alert, TouchableOpacity, DrawerLayoutAndroid } from "react-native";
import FastImage from "react-native-fast-image";
import { fonts, ic_app_logo, ic_menu, ic_search } from "../../shared";
import colors from "../../shared/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";
const appAppHeaderComp = () => {
    return (
        <AppNavbar />
    );
}

export const AppHeader = React.memo(appAppHeaderComp)
const AppNavbar = () => {
    const [searchToken, setSearchToken] = React.useState<String>("");
    const navigation = useNavigation();
    return (
        <View style={styles.wrapHeader}>
            <View style={styles.wrapHeaderLogo}>
                <FastImage
                    source={ic_app_logo}
                    resizeMode="contain"
                    style={styles.wrapLogo}
                />
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <FastImage
                        source={ic_menu}
                        resizeMode="contain"
                        style={styles.wrapMenu}>
                    </FastImage>
                </TouchableOpacity>
            </View>

            <View style={styles.wrapSearchBox}>
                <TextInput
                    placeholder="Search here"
                    style={styles.txtSearch}
                    onChangeText={(value) => { setSearchToken(value) }}
                />
                <View style={styles.container} />
                <FastImage
                    source={ic_search}
                    resizeMode="contain"
                    style={styles.wrapSearch}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    wrapHeader: {
        padding: 30,
        justifyContent: "center",
        backgroundColor: colors.cyan
    },
    wrapHeaderLogo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        backgroundColor: "green"
    },
    wrapLogo: {
        height: 38,
        aspectRatio: 1
    },
    wrapMenu: {
        height: 25,
        aspectRatio: 10,
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