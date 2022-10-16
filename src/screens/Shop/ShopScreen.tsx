import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ShopScreenComp = () => {
    return (
        <View style={styles.container}>
            <Text>Shop Screen</Text>
        </View>
    );
}

export const ShopScreen = React.memo(ShopScreenComp)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});
