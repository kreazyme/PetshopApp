import React from "react";
import { View, StyleSheet, Text } from "react-native";

const DrawerScreenComp = () => {
    return (
        <View style={styles.container}>
            <Text>Drawer Screen</Text>
        </View>
    );
}

export const DrawerScreen = React.memo(DrawerScreenComp)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});
