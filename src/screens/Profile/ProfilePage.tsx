import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from "react-native"
import colors from "../../shared/colors";
import { fonts, ic_back, img_avatar, img_profile, IProfile, IStore, SCREENNAME } from "../../shared";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

import DatePicker from "react-native-date-picker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";



const ProfilePageComp = () => {

    const token = useSelector((state: IStore) => state?.appReducer.token);
    const navigation = useNavigation<any>();

    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [data, setData] = React.useState<IProfile>()

    const getData = (async () => {
        setIsLoading(true)
        await fetch('http://pet.kreazy.me/user/infor',
            {
                method: "GET",
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    "Connection": "keep-alive",
                    "Authorization": `${token}`
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
        setIsLoading(false)
    })

    React.useEffect(() => {
        getData()
    }, [])

    const headerComponent = (() => {
        return (
            <View style={styles.wrapHeader}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack(); }}
                >
                    <FastImage
                        source={ic_back}
                        resizeMode="contain"
                        style={styles.wrapButtonBack}
                    />
                </TouchableOpacity>
                <View style={styles.wrapTextHeader}>
                    <Text style={styles.txtHeader}>
                        Profile
                    </Text>
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate(SCREENNAME.EDIT_PROFILE_SCREEN) }}>
                    <MaterialIcons
                        name="account-edit"
                        style={styles.ButtonIcon}
                    />
                </TouchableOpacity>

            </View>
        )
    })

    const renderItemDetail = (title: string, value: string) => {
        return <View style={styles.wrapTextInput}>
            <Text style={styles.txtTitle}>{value}</Text>
            <Text style={styles.txtInput}>
                {title}
            </Text>
        </View>
    }

    const joinDate = new Date(data?.createdAt ?? new Date().getTime())
    const birthDay = new Date(data?.birthday ?? new Date().getTime())

    return (
        <ScrollView style={styles.container}>
            {headerComponent()}
            {
                isLoading
                    ?
                    <View style={{ justifyContent: "center", marginTop: 200 }}>
                        <ActivityIndicator
                            size={"large"}
                            color={colors.cyan}
                        />
                    </View>
                    :
                    <>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <FastImage
                                source={data?.avatar ? { uri: data?.avatar } : img_avatar}
                                style={styles.wrapAvatar}
                                resizeMode="cover"
                            />
                            <Text style={styles.txtFullname}>
                                {data?.fullName}
                            </Text>
                            <Text style={styles.txtUsername}>
                                {`@${data?.name}`}
                            </Text>
                        </View>
                        <View style={styles.wrapEditor}>
                            {
                                data?.email &&
                                renderItemDetail(data.email, "Email")
                            }
                            {
                                data?.phone &&
                                renderItemDetail(data.phone, "Phone Number")
                            }
                            {
                                data?.createdAt &&
                                renderItemDetail(`${joinDate.getFullYear()} - ${joinDate.getMonth()} - ${joinDate.getDay()}`, "Joined Date")
                            }
                            {
                                data?.birthday &&
                                renderItemDetail(`${birthDay.getFullYear()} - ${birthDay.getMonth()} - ${birthDay.getDay()}`, "Birthday")
                            }
                            {
                                data?.address &&
                                renderItemDetail(data.address, "Address")
                            }
                            {
                                data?.sex != null &&
                                renderItemDetail(data.sex ? "Male" : "Female", "Sex")
                            }
                            {
                                data?.pet.toString() &&
                                renderItemDetail(data.pet.toString(), "Pet you have")
                            }
                            <View
                                style={{ height: 100 }}
                            />
                        </View>
                    </>
            }
        </ScrollView>
    );
}
export const ProfilePage = React.memo(ProfilePageComp)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapButtonBack: {
        height: 24,
        aspectRatio: 1,
    },
    txtHeader: {
        fontSize: fonts.font20,
        color: colors.black
    },
    wrapTextHeader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    wrapHeader: {
        flexDirection: "row",
        padding: 20
    },
    wrapAvatar: {
        height: 150,
        borderRadius: 100,
        flex: 1,
        aspectRatio: 1
    },
    wrapEditor: {
        marginHorizontal: 20
    },
    wrapTextInput: {
        marginTop: 5,
        borderBottomColor: colors.gray_bg,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20
    },
    txtInput: {
        marginTop: 10,
        fontSize: fonts.font18,
        color: colors.black
    },
    txtTitle: {
        fontSize: fonts.font18,
        fontWeight: "bold"
    },
    wrapDatePicker: {
        padding: 20
    },
    ButtonIcon: {
        marginRight: 16,
        alignItems: 'center',
        fontSize: 30,
        color: 'black',
    },
    txtFullname: {
        fontSize: fonts.font24,
        color: colors.cyan,
        fontWeight: "bold",
        marginTop: 10
    },
    txtUsername: {
        fontSize: fonts.font18,
        color: colors.orangeTabbar,
        marginBottom: 20
    }
})