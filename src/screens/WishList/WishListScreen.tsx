import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_APP_MODE } from "../../redux/actions/actionTypes";

const WishListScreenComp = () => {

    const dispatch = useDispatch()
    const darkMode = useSelector(state => state?.appReducer.darkMode);
    React.useEffect(() => {
        console.log("darkMode " + JSON.stringify(darkMode))
    }, [darkMode])

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    dispatch({
                        type: CHANGE_APP_MODE,
                        payload: !darkMode
                    })
                }}
            >
                <Text>WishList Screen</Text>
            </TouchableOpacity>
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
