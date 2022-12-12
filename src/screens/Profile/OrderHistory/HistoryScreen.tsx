import React from "react";
import { View, StyleSheet, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import { fonts, ICart, ic_back, IStore } from "../../../shared";
import colors from "../../../shared/colors";
import { HistoryItem } from "./Components";

const HistoryScreenComp = ({ navigation }: any) => {


    const token = useSelector((state: IStore) => state?.appReducer.token);

    const [data, setData] = React.useState<ICart[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const getData = (async () => {
        setLoading(true)
        await fetch(`http://pet.kreazy.me/api/history`,
            {
                method: "GET",
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    "Connection": "keep-alive",
                    "Authorization": `${token}`
                }
            }
        ).finally(() => {
            setLoading(false);
        }).then((response) => {
            return response.json()
        })
            .then((response,) => {
                setData(response)
            })
            .catch((error) => {
                console.error(error);
            });
        setLoading(false)
    })

    const onRefresh = () => {
        setIsRefreshing(true);
        getData();
        setIsRefreshing(false);
    }

    React.useEffect(() => {
        getData()
        console.log(data.length)
    }, [])

    const renderItem = ((item: ICart) => {
        return <HistoryItem item={item} />
    })

    const keyExtractor = React.useCallback((item: any, index: any) => `${item} ${index}`, []);


    return (
        <View style={styles.container}>
            <View style={styles.wrapHeader}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                >
                    <FastImage
                        source={ic_back}
                        resizeMode="contain"
                        style={{ width: 20, height: 20, marginRight: 20 }}
                    />
                </TouchableOpacity>
                <View style={styles.wrapTextHeader}>
                    <Text style={styles.txtHeader}>
                        Order History
                    </Text>
                </View>

            </View>
            <View>
                {
                    loading
                        ?
                        <View style={{ marginTop: 200 }}>
                            <ActivityIndicator
                                size={50}
                                color={colors.cyan}
                            />
                        </View>
                        :
                        <FlatList
                            data={data}
                            renderItem={(item) => renderItem(item.item)}
                            keyExtractor={keyExtractor}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isRefreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        />
                }
            </View>
        </View>
    );
}

export const HistoryScreen = React.memo(HistoryScreenComp)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapHeader: {
        flexDirection: "row",
        height: 50,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems:'center'
    },
    wrapTextHeader: {
        flex: 1,
        justifyContent: "center",
    },
    txtHeader: {
        fontSize: fonts.font20,
        color: colors.black,
    },
});
