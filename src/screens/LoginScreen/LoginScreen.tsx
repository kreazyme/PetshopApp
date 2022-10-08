import React from "react";
import { View, StyleSheet, Text } from "react-native";

const LoginScreenComp = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, color: "red" }}>132321</Text>
        </View>
    );
}

export const LoginScreen = React.memo(LoginScreenComp)

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
    },
});
