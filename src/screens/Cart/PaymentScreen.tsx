import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';
import Snackbar from 'react-native-snackbar';
import { useSelector } from 'react-redux';
import { fonts, ic_app_logo, ic_menu, IStore, SCREENNAME } from '../../shared';
import colors from '../../shared/colors';
const PaymentScreenComp = ({ navigation }: any) => {

    const route = useRoute();
    const { orderID } = route.params as { orderID: string };
    const { totalPay } = route.params as { totalPay: number }

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const token = useSelector((state: IStore) => state?.appReducer.token);
    const [url, setURL] = useState<string>("")
    const [name, setName] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState("")
    const checkoutOrder = (async () => {
        setIsLoading(true);
        var body = JSON.stringify({
            order_id: orderID
        })
        await fetch(`http://pet.kreazy.me/api/cart/checkout`,
            {
                method: "POST",
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    "Connection": "keep-alive",
                    "Authorization": `${token}`
                },
                body: body,
            }
        ).finally(() => {
            setIsLoading(false);
        }).then((response) => {
            return response.json()
        })
            .then((response,) => {
                console.log(JSON.stringify(response))
                if (response.url == null) {
                    Snackbar.show({
                        text: 'An error when checkout order. Please try again later',
                        duration: Snackbar.LENGTH_INDEFINITE,
                    });
                }
                else {
                    navigation.navigate(SCREENNAME.WEBVIEW_CHECKOUT_SCREEN, { pay_url: response.url })
                }
            })
            .catch((error) => {
                console.error(error);
            });
        setIsLoading(false);
    })

    React.useEffect(() => {
        console.log(url)
    }, [url])

    return (
        <View style={styles.container}>
            <View style={styles.wrapHeaderLogo}>
                <FastImage
                    source={ic_app_logo}
                    resizeMode="contain"
                    style={styles.wrapLogo}
                />
            </View>
            <View style={styles.header}>
                <Text style={styles.txtTitle}>Payment by Paypal</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.txtView}>
                    <Text style={{ fontSize: fonts.font18, color: colors.black }}>Total pay: </Text>
                    <View style={styles.container}></View>
                    <Text style={{ fontSize: fonts.font18, color: colors.black }}>{`${totalPay} VND`}</Text>
                </View>

                <View style={styles.creditCard}>

                    <TextInput
                        placeholder='Name'
                        value={name}
                        style={styles.txtInput}
                        placeholderTextColor='#C1C1C1'
                        onChangeText={(value) => setName(value)}
                    />
                    <TextInput
                        placeholder='Phone'
                        value={phone}
                        style={styles.txtInput}
                        placeholderTextColor='#C1C1C1'
                        onChangeText={(value) => setphone(value)}
                    />
                    <TextInput
                        placeholder='Delivery address'
                        value={address}
                        style={styles.txtInput}
                        placeholderTextColor='#C1C1C1'
                        onChangeText={(value) => setaddress(value)}
                    />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.txtButtonBack}>Cancel Payment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.wrapButton}
                        onPress={checkoutOrder}
                    >
                        {
                            isLoading
                                ?
                                <ActivityIndicator
                                    color={colors.white}
                                    size="small"
                                />
                                :
                                <Text style={styles.txtButton}>Pay</Text>
                        }
                    </TouchableOpacity>
                </View>


            </View>

        </View>
    );
};

export const PaymentScreen = React.memo(PaymentScreenComp);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },
    body: {
        marginTop: 50,
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        height: 60,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    creditCard: {
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 50,
        marginHorizontal: 10,
        borderColor: '#D3D3D3',
        borderWidth: 5,
        paddingRight: 60,

    },
    txtTitle: {
        fontSize: fonts.font20,
        fontWeight: 'bold',
        color: colors.black
    },
    txtView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },

    txtButton: {
        fontSize: fonts.font17,
        fontWeight: "500",
        color: colors.white
    },
    txtButtonBack: {
        fontSize: fonts.font17,
        fontWeight: "500",
        color: colors.cyan
    },
    txtInput: {
        fontSize: 20,
        color: colors.black,
        height: 44,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_bg,
        marginBottom: 20
    },
    wrapButton: {
        height: 50,
        width: 300,
        backgroundColor: colors.cyan,
        marginTop: 12,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    wrapHeaderLogo: {
        backgroundColor: colors.cyan,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 70,
    },
    wrapLogo: {
        height: 38,
        width: 165,
        aspectRatio: 1,
        marginLeft: 20
    },

})