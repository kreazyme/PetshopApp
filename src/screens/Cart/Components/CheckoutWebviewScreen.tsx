import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import FastImage from "react-native-fast-image";
import Snackbar from "react-native-snackbar";
import { WebView } from "react-native-webview";
import { useDispatch } from "react-redux";
import { RELOAD_CART } from "../../../redux/actions/actionTypes";
import { fonts, ic_back, SCREENNAME } from "../../../shared";
import colors from "../../../shared/colors";

const CheckoutWebviewScreenComp = () => {

    const navigation = useNavigation<any>();
    const route = useRoute();
    const dispatch = useDispatch();
    const { pay_url } = route.params as { pay_url: string };

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [webviewUrl, setWebviewUrl] = React.useState<string>(pay_url)

    const handleURL = ((newNavState: any) => {
        const { url } = newNavState;
        setWebviewUrl(url)
    })

    React.useEffect(() => {
        if (webviewUrl.includes("success")) {
            Snackbar.show({
                text: 'Checkout Succsess',
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    text: 'Go back to cart',
                    textColor: 'green',
                    onPress: () => {
                        navigation.navigate(SCREENNAME.CART_SCREEN)
                    },
                },
            });
        }
        if (webviewUrl.includes("cancel")) {
            Snackbar.show({
                text: 'Checkout Cancel',
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    text: 'Go back to cart',
                    textColor: 'green',
                    onPress: () => {
                        navigation.navigate(SCREENNAME.CART_SCREEN)
                    },
                },
            });
        }
        dispatch({
            type: RELOAD_CART,
            payload: true
        })
    }, [webviewUrl])
    return (
        <View style={styles.container}>
            <View
                style={styles.wrapHeader}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <FastImage
                        source={ic_back}
                        resizeMode="contain"
                        style={styles.wrapBack}
                    />
                </TouchableOpacity>
                <Text style={styles.wrapTextHeader}>Checkout your Paypal</Text>
                <View style={{ width: 40 }}>
                    {
                        isLoading
                            ?
                            <View style={styles.wrapLoading}>
                                <ActivityIndicator
                                    size={30}
                                    color={colors.cyan}
                                />
                            </View>
                            :
                            <View />
                    }
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <WebView
                    onNavigationStateChange={handleURL}
                    source={{ uri: pay_url }}
                    javaScriptEnabled={true}
                    onLoadStart={() => setIsLoading(true)}
                    onLoadEnd={() => setIsLoading(false)}
                />
            </View>
        </View>
    );
}

export const CheckoutWebviewScreen = React.memo(CheckoutWebviewScreenComp)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapBack: {
        height: 20,
        aspectRatio: 1,
        marginRight: 20
    },
    wrapHeader: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 70
    },
    wrapLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapTextHeader: {
        fontSize: fonts.font24,
        fontWeight: 'bold',
    }
});
