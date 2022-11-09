import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, FlatList, TextInput, ActivityIndicator } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import FastImage from "react-native-fast-image";
import { fonts, ic_app_logo, ic_menu, ic_search, IProduct, IProductprops } from "../../shared";
import colors from "../../shared/colors";
import { AppHeader } from "../Header";
import { ItemProduct } from "./Components";

const ShopScreenComp = () => {
    const [searchToken, setSearchToken] = React.useState<String>("");
    // const [data, setData] = React.useState<any>([]);
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState("all");
    const [data, setData] = useState<IProduct[]>([]);
    const [items, setItems] = useState([
        { label: 'All Product', value: 'all' },
        { label: `Pet's Toys`, value: 'toys' },
        { label: 'Cat Food', value: 'cat' },
        { label: 'Dog Food', value: 'dog' }
    ]);

    const loadData = async () => {
        fetch('https://demoaapi.free.beeceptor.com/demo12')
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    React.useEffect(() => {
        loadData();
    }, [])
    const renderItem = ({ item }: IProductprops) => {
        return <ItemProduct item={item} />
    }
    const keyExtractor = React.useCallback((item: any, index: any) => `${item} ${index}`, []);

    const headerComponent = (() => {
        return <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
        return <View style={{ height: open ? 200 : 50, margin: 20 }}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={{ flex: 1 }}
            />
        </View>
    })

    if (data.length === 0) {
        return <View style={styles.wrapLoading}>
            <ActivityIndicator
                color={colors.cyan}
                size={"large"} />
        </View>
    }

    return (
        <View style={styles.container}>
            <AppHeader />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                numColumns={2}
                ListHeaderComponent={headerComponent}
            />
        </View>
    );
}

export const ShopScreen = React.memo(ShopScreenComp)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapHeader: {
        padding: 30,
        height: 160,
        justifyContent: "center",
        backgroundColor: colors.cyan
    },
    wrapLogo: {
        height: 38,
        width: 165
    },
    wrapHeaderLogo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1
    },
    wrapMenu: {
        height: 25,
        aspectRatio: 1,
    },
    wrapSearch: {
        height: 25,
        aspectRatio: 1,
        marginRight: 20
    },
    wrapSearchBox: {
        backgroundColor: colors.white,
        borderRadius: 20,
        marginTop: 20,
        height: 50,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    txtSearch: {
        fontSize: fonts.font20,
        paddingHorizontal: 20
    },
    wrapLoading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
