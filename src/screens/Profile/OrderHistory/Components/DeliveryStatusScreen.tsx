import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { ic_back } from "../../../../shared";

const DeliveryStatusScreenComp = () => {

    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { deliveryID } = route.params as { deliveryID: string };

    const [data, setData] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [refreshing, setRefreshing] = React.useState<boolean>(false);

    const getData = (async () => {
        setLoading(true)
        await fetch(`http://pet.kreazy.me/api/history`,
            {
                method: "GET",
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    "Connection": "keep-alive",
                },
                body: JSON.stringify({
                    delivery_id: deliveryID
                })
            }
        ).finally(() => {
            setLoading(false);
        }).then((response) => {
            return response.json()
        })
            .then((response,) => {
                setData(response)
            })
            .catch((error) => {
                console.error(error);
            });
        setLoading(false)
    })

    React.useEffect(() => {
        getData()
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.wrapHeader}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <FastImage
                        source={ic_back}
                        style={styles.wrapBack}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <Text style={styles.txtHeader}>
                    Delivery Status
                </Text>
            </View>
        </View>
    );
}

export const DeliveryStatusScreen = React.memo(DeliveryStatusScreenComp)

const styles = StyleSheet.create({
    container: {
    },
    wrapHeader: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 10,
    },
    wrapBack: {
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    txtHeader: {
        fontSize: 20,
        color: "#2b1e1e",
        flex: 1,
        textAlign: "center"
    }
});
