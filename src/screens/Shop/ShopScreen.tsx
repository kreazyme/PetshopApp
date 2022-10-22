import React, { useState } from "react";
import { View, StyleSheet, FlatList, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import FastImage from "react-native-fast-image";
import { fonts, ic_app_logo, ic_menu, ic_search } from "../../shared";
import colors from "../../shared/colors";
import { ItemProduct } from "./Components";

const ShopScreenComp = () => {

    const [data, setData] = React.useState<any>([]);
    const [searchToken, setSearchToken] = React.useState<String>("");
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    React.useEffect(() => {
        const array = [1, 2, 1, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
        setData(array);
    }, [])


    const renderHeader = (() => {
        return <View style={styles.wrapHeader}>
            <View style={styles.wrapHeaderLogo}>
                <FastImage
                    source={ic_app_logo}
                    resizeMode="contain"
                    style={styles.wrapLogo}
                />
                <FastImage
                    source={ic_menu}
                    resizeMode="contain"
                    style={styles.wrapMenu}
                />
            </View>
            <View style={styles.wrapSearchBox}>
                <TextInput
                    placeholder="Search here"
                    style={styles.txtSearch}
                    onChangeText={(value) => { setSearchToken(value) }}
                />
                <View style={styles.container} />
                <FastImage
                    source={ic_search}
                    resizeMode="contain"
                    style={styles.wrapSearch}
                />
            </View>
        </View>
    })

    const renderItem = ({ item }: any) => {
        return <ItemProduct />
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
    })

    return (
        <View style={styles.container}>
            {renderHeader()}
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
    }
});
