import React from "react";
import { View, StyleSheet } from "react-native";

const DetailProductScreenComp = () => {


    return (
        <View style={styles.container}>
        </View>
    );
}

export const DetailProductScreen = React.memo(DetailProductScreenComp)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
