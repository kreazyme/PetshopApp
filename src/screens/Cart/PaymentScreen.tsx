import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { fonts, ic_app_logo, ic_menu } from '../../shared';
import colors from '../../shared/colors';
const PaymentScreenComp = ({ navigation }: any) => {
    const [total, setTotal] = React.useState<number>(0)
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
                    <Text style={{ fontSize: fonts.font18, color:colors.black }}>Paypal total</Text>
                    <View style={styles.container}></View>
                    <Text style={{ fontSize: fonts.font18, color:colors.black }}>{`${total} VND`}</Text>
                </View>

                <View style={styles.creditCard}>
                    <Text>Hel</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.txtButtonBack}>Cancel Payment</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.wrapButton} >
                    <Text style={styles.txtButton}>Pay</Text>
                </TouchableOpacity>

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
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        display: 'flex',
        height: 60,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    txtTitle: {
        fontSize: fonts.font20,
        fontWeight: 'bold',
        color: colors.black
    },
    creditCard: {
        backgroundColor: '#FFF',
        height: 300,
        width: '93%',
        padding: 12,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 50,
        borderColor: '#D3D3D3',
        borderWidth: 5
    },
    txtView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
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