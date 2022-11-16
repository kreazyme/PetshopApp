import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { cat, fonts, IProduct } from "../../shared";
import { useNavigation } from "@react-navigation/native";
import colors from "../../shared/colors";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRoute } from "@react-navigation/native";

const DetailProductScreenComp = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const { item } = route.params as { item: IProduct };
    const image = item.images.url;
    const title = item.title
    const price = item.price
    const description = item.description
    const amount = item.amount;
    const listCategory = ["Cat's food", "Dog's food"]
    console.log(item);

    const renderAddtoCart = (() => {
        return <TouchableOpacity style={styles.wrapCheckout}>
            <Text style={styles.txtCheckout}>Add to Cart</Text>
        </TouchableOpacity>
    })
    const keyExtractor = React.useCallback((item: any, index: any) => `${item} ${index}`, []);


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.wrapHeader}>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Icon name="menu" style={styles.ButtonIcon} />
                    </TouchableOpacity>
                    <Text style={{ color: "#000", fontSize: fonts.font18 }}>Product Detail</Text>
                </View>
                <FastImage
                    source={{ uri: image }}
                    style={styles.wrapImage}
                />
                <Text
                    style={styles.txtTitle}
                >{title}</Text>
                <Text
                    style={styles.txtPrice}
                >{price + "₫"}</Text>
                <Text
                    style={styles.txtDescription}
                >{description}</Text>
                <FlatList
                    horizontal={true}
                    data={listCategory}
                    renderItem={({ item }) => (
                        // <CartComponent item={item} />
                        <View style={styles.wrapCategory}>
                            <Text style={styles.txtCategory}>{item}</Text>
                        </View>
                    )}
                    keyExtractor={keyExtractor}
                />
            </ScrollView>
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
        fontSize: 24,
        color: 'black'
    },
    wrapHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: "center",
        paddingHorizontal: 20,
        height: 50
    },
    txtTitle: {
        fontSize: fonts.font20,
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
        marginTop: 20
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
    }
});
