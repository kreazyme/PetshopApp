import React from "react";
import { View, StyleSheet, Dimensions, Button, Text, Alert, ScrollView, TouchableOpacity, TextInput, StatusBar, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { cat, fonts, ICart, IProductCart, IStore, SCREENNAME } from "../../shared";
import colors from "../../shared/colors";
import { AppHeader } from "../Header";
import { CartComponent } from "./Components";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
interface IProductCartParams {
    item: IProductCart
}

export default () => {
    const navigation = useNavigation<any>();
    const token = useSelector((state: IStore) => state?.appReducer.token);


    const [total, setTotal] = React.useState<number>(0)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false)
    const [data, setData] = React.useState<ICart>()


    const getData = (async () => {
        setIsLoading(true);
        await fetch(`http://pet.kreazy.me/api/cart`,
            {
                method: "GET",
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    "Connection": "keep-alive",
                    "Authorization": `${token}`
                },
            }
        ).finally(() => {
            setIsLoading(false);
        }).then((response) => response.json())
            .then((response,) => {
                console.log(JSON.stringify(response))
                setData(response)
            })
            .catch((error) => {
                console.error(error);
            });
        setIsLoading(false);
    })

    React.useEffect(() => {
        setTotal(data?.total ?? 0)
    }, [data])


    React.useEffect(() => {
        getData();
    }, [])

    const renderCheckout = (() => {
        return <TouchableOpacity
            disabled={total === 0}
            style={styles.wrapCheckout}
            onPress={() => {
                navigation.navigate(SCREENNAME.PAYMENT_SCREEN)
            }}>
            <Text style={styles.txtCheckout}>{`Check out: ${total} VND`}</Text>
        </TouchableOpacity>
    })

    const renderEmpty = (() => {
        return <View style={{ marginTop: 200 }}>
            <Text style={{ color: colors.cyan, fontSize: 20, textAlign: "center" }}>{`Empty Card!\n Add any product to checkout`}</Text>
        </View>
    })

    const keyExtractor = React.useCallback((item: any, index: any) => `${item} ${index}`, []);
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                {
                    isLoading
                        ?
                        <View
                            style={{
                                justifyContent: "center", alignItems: "center", flex: 1
                            }}
                        >
                            <ActivityIndicator
                                size={"large"}
                                color={colors.cyan}
                            />
                        </View>
                        :
                        <FlatList
                            renderItem={({ item }) => (
                                <CartComponent itemType={item} />
                            )}
                            data={data?.listOrderItems}
                            keyExtractor={keyExtractor}
                            ListEmptyComponent={renderEmpty}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isRefreshing}
                                    onRefresh={getData}
                                />
                            }
                        />
                }
            </View>
            {renderCheckout()}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        padding: 20,

    },
    wrapCheckout: {
        height: 50,
        backgroundColor: colors.cyan,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 50
    },
    txtCheckout: {
        fontSize: fonts.font20,
        fontWeight: "500",
        color: colors.white
    }
});


