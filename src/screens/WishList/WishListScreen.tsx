import React from "react";
import { View, StyleSheet, Text } from "react-native";

const WishListScreenComp = () => {
    return (
        <View style={styles.container}>
            <Text>WishList Screen</Text>
        </View>
    );
}

export const WishListScreen = React.memo(WishListScreenComp)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});
