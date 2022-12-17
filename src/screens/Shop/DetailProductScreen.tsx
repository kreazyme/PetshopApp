import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import FastImage from "react-native-fast-image";
import { cat, fonts, ic_back, img_error, IProduct, IStore, SCREENNAME } from "../../shared";
import { useNavigation } from "@react-navigation/native";
import colors from "../../shared/colors";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import { FeedbackComp } from "./Components/FeedbackComp";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "react-native-snackbar";
import { RELOAD_CART } from "../../redux/actions/actionTypes";

const DetailProductScreenComp = () => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const route = useRoute();
    const token = useSelector((state: IStore) => state?.appReducer.token);

    const { productID } = route.params as { productID: string };
    const [cardCount, setCardCount] = useState<number>(1);
    const [data, setData] = React.useState<IProduct>();
    const [refreshing, setRefreshing] = useState(false);


    const [isLoading, setIsLoading] = React.useState(false);
    const [isAddCart, setIsAddCart] = React.useState(false);


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<number>(-1);
    const [items, setItems] = useState([{}]);

    const getData = (async () => {
        setIsLoading(true);
        await fetch(`http://pet.kreazy.me/api/products/${productID}`,
            {
                method: "GET",
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    "Connection": "keep-alive"
                },
            }
        ).finally(() => {
            setIsLoading(false);
        }).then((response) => response.json())
            .then((response,) => {
                setData(response)
            })
            .catch((error) => {
                console.error(error);
            });
        setIsLoading(false);
    })

    const addCart = (async () => {
        setIsAddCart(true)
        var body = {
            "type_id": data?.types[value]._id,
            "amount": cardCount,
            "product_id": productID
        }
        console.log(JSON.stringify(body))
        await fetch(`http://pet.kreazy.me/api/cart`,
            {
                method: "PUT",
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    "Connection": "keep-alive",
                    "Authorization": `${token}`
                },
                body: JSON.stringify(body)
            }
        ).finally(() => {
            setIsAddCart(false);
        }).then((response) => {
            if (response.status == 200) {
                Snackbar.show({
                    text: 'Add this product to cart successfully!',
                    duration: Snackbar.LENGTH_LONG,
                    action: {
                        text: 'Checkout now',
                        textColor: 'green',
                        onPress: () => {
                            navigation.navigate(SCREENNAME.CART_SCREEN)
                        },
                    },
                });
                dispatch({
                    type: RELOAD_CART,
                    payload: true
                })
            }
            else {
                Snackbar.show({
                    text: 'Cannot add to cart!',
                    duration: Snackbar.LENGTH_LONG
                });

            }
            return response.json()
        })
            .then((response,) => {
                console.log(response)
            })
            .catch((error) => {
                console.error(error);
            });
        setIsAddCart(false);
    })


    const onRefresh = (() => {
        setRefreshing(true);
        getData()
        setRefreshing(false);
    })

    React.useEffect(() => {
        getData();
    }, []);

    React.useEffect(() => {
        setItems([])
        if (data?.types != null) {
            data?.types.map((item, index) => {
                setItems((prev) => [...prev, { label: item.name, value: index }])
            })
        }
        console.log(data)
        setValue(0)
    }, [data])


    const renderAddtoCart = (() => {
        return <View style={styles.wrapViewAddcard}>
            <View style={styles.wrapBorder}>
                <TouchableOpacity
                    onPress={() => {
                        if (cardCount > 1)
                            setCardCount(cardCount - 1)
                    }}
                    style={styles.wrapAddBuon}>
                    <Text style={styles.txtBuonAdd}>
                        -
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.wrapAddBuon}>
                    <Text style={styles.txtBuonAdd}>
                        {`${cardCount}`}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setCardCount(cardCount + 1)
                    }}
                    style={styles.wrapAddBuon}>
                    <Text style={styles.txtBuonAdd}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.wrapCheckout}
                onPress={() => {
                    addCart()
                }}
            >
                {
                    isAddCart
                        ?
                        <ActivityIndicator
                            size={"small"}
                            color={"white"}
                        />
                        :
                        <Text style={styles.txtCheckout}>Add to Cart</Text>
                }
            </TouchableOpacity>
        </View>
    })
    const keyExtractor = React.useCallback((item: any, index: any) => `${item} ${index}`, []);


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
                        resizeMode={"contain"}
                        tintColor={"black"}
                        style={styles.ButtonIcon} />
                </TouchableOpacity>
                <Text style={{ color: "#000", fontSize: fonts.font18 }}>Product Detail</Text>
            </View>
            <View style={{ flex: 1 }}>
                {
                    isLoading
                        ?
                        <View style={{ flex: 1, justifyContent: "center", flexDirection: "column" }}>
                            <ActivityIndicator
                                size={"large"}
                                color={colors.cyan}
                            />
                        </View>
                        :
                        <View style={{ flex: 1 }}>
                            {
                                data?._id == null
                                    ?
                                    <View style={{ flex: 1, alignItems: "center", paddingTop: 100 }}>
                                        <FastImage
                                            source={img_error}
                                            style={{ height: 300, width: 300, }}
                                            resizeMode={"contain"}
                                        />
                                    </View>
                                    :
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                    >
                                        <View style={{ backgroundColor: "white", paddingVertical: 20, paddingHorizontal: 10, borderRadius: 10 }}>
                                            <FastImage
                                                source={{ uri: data?.images?.url ?? "" }}
                                                style={styles.wrapImage}
                                            />
                                            <Text
                                                style={styles.txtTitle}
                                            >{data?.title}</Text>
                                            <Text
                                                style={styles.txtPrice}
                                            >{(data?.types[value]?.price ?? "0") + " ₫"}</Text>
                                            <Text
                                                style={styles.txtDescription}
                                            >{data?.description}</Text>

                                            <View style={{ height: open ? (data?.types?.length ?? 1) * 50 : 60, }}>
                                                <DropDownPicker
                                                    open={open}
                                                    value={value}
                                                    items={items}
                                                    setOpen={setOpen}
                                                    setValue={setValue}
                                                    setItems={setItems}
                                                    listMode={"SCROLLVIEW"}
                                                />
                                            </View>

                                            <FlatList
                                                horizontal={true}
                                                data={[data?.category]}
                                                renderItem={({ item }) => (
                                                    <View style={styles.wrapCategory}>
                                                        <Text style={styles.txtCategory}>{item}</Text>
                                                    </View>
                                                )}
                                                refreshControl={
                                                    <RefreshControl
                                                        refreshing={refreshing}
                                                        onRefresh={onRefresh}
                                                    />
                                                }
                                                refreshing={true}
                                                keyExtractor={keyExtractor}
                                            />

                                            <Text
                                                style={styles.txtDescription}
                                            >{`Sold out: ${data?.sold}`}</Text>
                                        </View>
                                        <View style={{ height: 50 }} />
                                        {
                                            data?.feedbacks.length == 0
                                                ?
                                                <View></View>
                                                :
                                                <FeedbackComp
                                                    listFeedback={data?.feedbacks}
                                                />
                                        }
                                    </ScrollView>
                            }
                        </View>
                }
            </View>
            {
                renderAddtoCart()
            }
        </View>
    );
}

export const DetailProductScreen = React.memo(DetailProductScreenComp)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    wrapImage: {
        aspectRatio: 1,
        margin: 10,
    },
    ButtonIcon: {
        marginRight: 16,
        alignItems: 'center',
        height: 16,
        aspectRatio: 1
    },
    wrapHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: "center",
        paddingHorizontal: 20,
        height: 50,
        borderBottomColor: "gray",
        borderBottomWidth: 1
    },
    txtTitle: {
        fontSize: fonts.font24,
        color: colors.cyan,
        fontWeight: "bold",

    },
    txtPrice: {
        fontSize: fonts.font24,
        color: colors.orangeTabbar,
        fontWeight: 'bold',
        marginVertical: 10
    },
    txtDescription: {
        fontSize: fonts.font18,
        color: colors.grayTabbar,
    },

    wrapCheckout: {
        height: 50,
        backgroundColor: colors.cyan,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        alignContent: "center"
    },

    txtCheckout: {
        fontSize: fonts.font20,
        fontWeight: "500",
        color: colors.white
    },

    wrapLsCategory: {
        flexDirection: "row",
    },

    txtCategory: {

    },

    wrapCategory: {
        backgroundColor: colors.gray_bg,
        padding: 4,
        margin: 4,
        borderRadius: 2,
    },

    wrapBorder: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 20,
        flex: 1,
        marginRight: 20,
        flexDirection: "row"
    },

    wrapViewAddcard: {
        flexDirection: "row",
    },

    wrapAddBuon: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },

    txtBuonAdd: {
        color: colors.cyan,
        fontSize: fonts.font20,
        fontWeight: "bold",
    },

});
