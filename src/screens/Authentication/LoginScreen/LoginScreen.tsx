import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { decreaseAction, increaseAction } from "../../../redux/actions";

const LoginScreenComp = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    increaseAction(2)
                }}
            >
                <Text>Button + </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    decreaseAction(2)
                }}
            >
                <Text>Button - </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 30, color: "red" }}>{"gkolahdnfgioud"}</Text>
        </View>
    );
}

export const LoginScreen = React.memo(LoginScreenComp)

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
    },
});
