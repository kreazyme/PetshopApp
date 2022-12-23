import React from "react";
import { View, StyleSheet, Dimensions, Button, Text, Alert, ScrollView, TouchableOpacity, TextInput, StatusBar, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { cat, fonts, ICart, ic_app_logo, ic_menu, IProductCart, IStore, SCREENNAME } from "../../shared";
import colors from "../../shared/colors";
import { AppHeader } from "../Header";
import { CartComponent } from "./Components";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import FastImage from "react-native-fast-image";
import { RELOAD_CART } from "../../redux/actions/actionTypes";
interface IProductCartParams {
    item: IProductCart
}

export default () => {

    const dispatch = useDispatch();
    const navigation = useNavigation<any>();
    const token = useSelector((state: IStore) => state?.appReducer.token);
    const isReloadCart = useSelector((state: IStore) => state?.appReducer.isReloadCart);


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

    React.useEffect(() => {
        if (isReloadCart) {
            getData();
            dispatch({
                type: RELOAD_CART,
                payload: false
            })
        }
    }, [isReloadCart])

    const renderCheckout = (() => {
        return <TouchableOpacity
            disabled={total === 0}
            style={styles.wrapCheckout}
            onPress={() => {
                navigation.navigate(SCREENNAME.PAYMENT_SCREEN, { orderID: data?._id, totalPay: data?.total })
            }}>
            <Text style={styles.txtCheckout}>{`Check out: ${total} VND`}</Text>
        </TouchableOpacity>
    })

    const renderEmpty = (() => {
        return <View style={{ marginTop: 200 }}>
            <Text style={{ color: colors.cyan, fontSize: 20, textAlign: "center" }}>{`Empty Card!\n Add any product to checkout`}</Text>
        </View>
    })


    const renderHeader = (() => {
        return <View style={styles.wrapHeader}>
            <FastImage
                source={ic_app_logo}
                resizeMode="contain"
                style={styles.wrapLogo}
            />
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <FastImage
                    source={ic_menu}
                    resizeMode="contain"
                    style={styles.wrapMenu}>
                </FastImage>
            </TouchableOpacity>
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
                            ListHeaderComponent={renderHeader}
                            ListFooterComponent={<View style={{ height: 50 }}></View>}
                            stickyHeaderIndices={[0]}
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
    },
    wrapLogo: {
        height: 38,
        width: 165,
        aspectRatio: 1
    },
    wrapMenu: {
        height: 25,
        aspectRatio: 1,
    },
    wrapHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        backgroundColor: colors.cyan,
        height: 80,
    },
});


