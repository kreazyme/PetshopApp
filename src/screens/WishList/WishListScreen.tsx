import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import { cat, fonts, IProductCart, IProductWishList } from "../../shared";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_APP_MODE } from "../../redux/actions/actionTypes";
import { AppHeader } from "../Header";
import { WishListComponent } from "./Component";
import colors from "../../shared/colors";

const listProduct = [
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000,
        status: true
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000,
        status: false
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000,
        status: false
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000,
        status: false
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000,
        status: false
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000,
        status: true
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000,
        status: true
    },
]
interface IProductWishListParams {
    item: IProductWishList
}
const WishListScreenComp = () => {
    const [total, setTotal] = React.useState<number>(0)
    const keyExtractor = React.useCallback((item: any, index: any) => `${item} ${index}`, []);
    return (
        <View style={{ flex: 1 }}>
            <AppHeader />
            <View style={styles.container}>
                <FlatList
                    renderItem={({ item }) => (
                        <WishListComponent item={item} />
                    )}
                    data={listProduct}
                    keyExtractor={keyExtractor}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}

export const WishListScreen = React.memo(WishListScreenComp)

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



// const WishListScreenComp = () => {

//     const dispatch = useDispatch()
//     const darkMode = useSelector(state => state?.appReducer.darkMode);
//     React.useEffect(() => {
//         console.log("darkMode " + JSON.stringify(darkMode))
//     }, [darkMode])

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity
//                 onPress={() => {
//                     dispatch({
//                         type: CHANGE_APP_MODE,
//                         payload: !darkMode
//                     })
//                 }}
//             >
//                 <Text>WishList Screen</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// export const WishListScreen = React.memo(WishListScreenComp)

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//     },
// });
