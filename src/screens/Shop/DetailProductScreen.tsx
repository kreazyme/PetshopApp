import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import FastImage from "react-native-fast-image";
import { cat, fonts, ic_back, IProduct } from "../../shared";
import { useNavigation } from "@react-navigation/native";
import colors from "../../shared/colors";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import { FeedbackComp } from "./Components/FeedbackComp";

const DetailProductScreenComp = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { productID } = route.params as { productID: string };
    const [cardCount, setCardCount] = useState<number>(1);
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState<IProduct>();

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
                console.log("data ", data)
            })
            .catch((error) => {
                console.error(error);
            });
        setIsLoading(false);
    })

    React.useEffect(() => {
        getData();
    }, []);

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
            <TouchableOpacity style={styles.wrapCheckout}>
                <Text style={styles.txtCheckout}>Add to Cart</Text>
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
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ backgroundColor: "white", paddingVertical: 20, paddingHorizontal: 10, borderRadius: 10 }}>
                            <FastImage
                                source={{ uri: data?.images.url }}
                                style={styles.wrapImage}
                            />
                            <Text
                                style={styles.txtTitle}
                            >{data?.title}</Text>
                            <Text
                                style={styles.txtPrice}
                            >{data?.price ?? "20000" + "₫"}</Text>
                            <Text
                                style={styles.txtDescription}
                            >{data?.description}</Text>
                            <FlatList
                                horizontal={true}
                                data={[data?.category]}
                                renderItem={({ item }) => (
                                    <View style={styles.wrapCategory}>
                                        <Text style={styles.txtCategory}>{item}</Text>
                                    </View>
                                )}
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
            {renderAddtoCart()}
        </View>
    );
}

export const DetailProductScreen = React.memo(DetailProductScreenComp)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
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
        height: 50
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
