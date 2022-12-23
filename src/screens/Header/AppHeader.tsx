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
    return <View style={styles.wrapHeader}>
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
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    wrapHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        backgroundColor: colors.cyan,
        height: 80,
    },
    wrapLogo: {
        height: 38,
        width: 165,
        aspectRatio: 1
    },
    wrapMenu: {
        height: 25,
        aspectRatio: 1,
    },
});