import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { cat, fonts, ic_trash, IProductCart, IProductWishList } from "../../../shared";
import colors from "../../../shared/colors";
interface IProductWishListParams {
    item: IProductWishList
}

const WishListComponentComp = ({ item }: IProductWishListParams) => {

    const image = item.image;
    const productName = item.title
    const price = item.price;
    const status = item.status;

    const renderStatus = ((title: String, status: boolean) => {
        return (
            <View style={styles.wrapPrice}>
                <Text style={styles.txtTitle}>
                    {title}
                </Text>
                {status === true ? <View>
                    <Text style={styles.txtName}>IN STOCK</Text>
                </View> : <View>
                    <Text style={styles.txtName}>EXPORTED</Text>
                </View>}
            </View>
        );
    })
    const renderPrice = ((title: String, txtPrice: any) => {
        return <View style={styles.wrapPrice}>
            <Text style={styles.txtTitle}>
                {title}
            </Text>
            <Text style={styles.txtName}>
                {`${txtPrice} VND`}
            </Text>
        </View>
    })

    return (
        <View style={styles.container}>
            <FastImage
                source={image}
                style={styles.wrapImageProduct}
                resizeMode="contain"
            />
            <View style={styles.wrapDetail}>
                <View style={styles.wrapTrashDetail}>
                    <Text
                        numberOfLines={3}
                        style={styles.txtName}>
                        {productName || ""}
                    </Text>
                    <FastImage
                        source={ic_trash}
                        style={styles.wrapTrash}
                        resizeMode="contain"
                    />
                </View>

                {renderPrice("Price: ", price)}
                {renderStatus("Stock status: ", status)}
                <View style={styles.wrapPadding} />
            </View>
        </View>
    );
}

export const WishListComponent = React.memo(WishListComponentComp)

const styles = StyleSheet.create({
    container: {
        borderTopColor: colors.gray_bg,
        borderTopWidth: 2,
        flexDirection: "row",
        padding: 10,
        paddingTop: 20
    },
    wrapImageProduct: {
        height: 120,
        aspectRatio: 1,
        marginRight: 10,
        borderRadius: 10
    },
    wrapDetail: {
        flex: 1,
        flexDirection: "column"
    },
    wrapTrash: {
        height: 24,
        aspectRatio: 1,
        margin: 10,
    },
    wrapTrashDetail: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 10
    },
    txtName: {
        fontSize: fonts.font20,
        fontWeight: "600",
        color: colors.cyan_text,
        flex: 1
    },
    txtTitle: {
        fontSize: fonts.font20,
        fontWeight: "400",
        color: colors.cyan_text

    },
    wrapPrice: {
        borderTopColor: colors.gray_bg,
        borderTopWidth: 2,
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center"
    },
    txtQuantity: {
        fontSize: fonts.font24,
        fontWeight: "700"
    },
    txtNumberQuantity: {
        fontSize: fonts.font20,
        fontWeight: "700",
        borderRightWidth: 2,
        borderRightColor: colors.gray_bg,
        borderLeftColor: colors.gray_bg,
        borderLeftWidth: 2,
        paddingHorizontal: 15
    },
    wrapQuantity: {
        borderRadius: 50,
        width: 150,
        borderWidth: 1,
        borderColor: colors.gray_bg,
        flexDirection: "row",
        justifyContent: "space-evenly",
        height: 40,
        alignItems: "center"
    },
    wrapPadding: {
        height: 30,
        width: 30
    }
});