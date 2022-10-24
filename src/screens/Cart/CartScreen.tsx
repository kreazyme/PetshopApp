import React from "react";
import { View, StyleSheet, Dimensions, Button, Text, Alert, ScrollView, TouchableOpacity, TextInput, StatusBar, FlatList } from "react-native";
import { cat, fonts, IProductCart } from "../../shared";
import colors from "../../shared/colors";
import { CartComponent } from "./Components";

const listProduct = [
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000
    },
]

interface IProductCartParams {
    item: IProductCart
}

export default () => {
    const [total, setTotal] = React.useState<number>(0)
    React.useEffect(() => {
        var price = 0;
        listProduct.forEach(element => {
            price += element.price
        });
        setTotal(price)
    }, [])
    const renderCheckout = (() => {
        return <TouchableOpacity style={styles.wrapCheckout}>
            <Text style={styles.txtCheckout}>{`Check out: ${total} VND`}</Text>
        </TouchableOpacity>
    })

    const keyExtractor = React.useCallback((item: any, index: any) => `${item} ${index}`, []);
    return (
        <View style={styles.container}>
            <FlatList
                renderItem={({ item }) => (
                    <CartComponent item={item} />
                )}
                data={listProduct}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={renderCheckout}
            />
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
        alignItems: "center"
    },
    txtCheckout: {
        fontSize: fonts.font20,
        fontWeight: "500",
        color: colors.white
    }
});


