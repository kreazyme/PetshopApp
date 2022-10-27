import React from "react";
import { View, StyleSheet, Text, StatusBar, TextInput, ScrollView, Button, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import FastImage from "react-native-fast-image";
import { fonts, ic_back, img_avatar } from "../../shared";
import colors from "../../shared/colors";

const EditProfileScreenComp = () => {

    const [image, setImage] = React.useState<String>("");
    const [name, setName] = React.useState<String>("12312");
    const [username, setUsername] = React.useState<String>("")
    const [email, setEmail] = React.useState<String>("")
    const [address, setAddress] = React.useState<String>("")
    const [phone, setPhone] = React.useState<String>("")
    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false)

    const avatar = img_avatar;


    const renderHeader = (() => {
        return <View style={styles.wrapHeader}>
            <FastImage
                source={ic_back}
                resizeMode="contain"
                style={styles.wrapButtonBack}
            />
            <View style={styles.wrapTextHeader}>
                <Text style={styles.txtHeader}>
                    Edit Profile
                </Text>
            </View>
        </View>
    })


    return (
        <ScrollView style={styles.container}>
            {renderHeader()}
            <View style={{ borderRadius: 100 }}>
                <FastImage
                    source={avatar}
                    style={styles.wrapAvatar}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.wrapEditor}>
                <View style={styles.wrapTextInput}>
                    <Text>Name</Text>
                    <TextInput
                        value={name}
                        placeholder={"Enter your name"}
                        style={styles.txtInput}
                        onChangeText={(value) => setName(value)}
                    />
                </View>
                <View style={styles.wrapTextInput}>
                    <Text>Username</Text>
                    <TextInput
                        value={username}
                        placeholder={"Enter your username"}
                        style={styles.txtInput}
                        onChangeText={(value) => setUsername(value)}
                    />
                </View>
                <View style={styles.wrapTextInput}>
                    <Text>Email</Text>
                    <TextInput
                        value={email}
                        placeholder={"Enter your email"}
                        style={styles.txtInput}
                        onChangeText={(value) => setEmail(value)}
                    />
                </View>
                <View style={styles.wrapTextInput}>
                    <Text>Phone Number</Text>
                    <TextInput
                        value={phone}
                        placeholder={"Enter your phone number"}
                        style={styles.txtInput}
                        onChangeText={(value) => setPhone(value)}
                    />
                </View>
                <View style={{ paddingVertical: 40 }}>
                    <Text>Birth day</Text>
                    <TouchableOpacity
                        style={styles.wrapDatePicker}
                        onPress={() => { setOpen(true) }}
                    >
                        <Text style={styles.txtInput}>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</Text>
                    </TouchableOpacity>
                </View>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
            </View>
        </ScrollView>
    );
}

export const EditProfileScreen = React.memo(EditProfileScreenComp)

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
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginTop: 40
    },
    wrapEditor: {
        marginHorizontal: 50
    },
    wrapTextInput: {
        marginTop: 40,
        borderBottomColor: colors.gray_bg,
        borderBottomWidth: 2
    },
    txtInput: {
        fontSize: fonts.font16,
        color: colors.black
    },
    wrapDatePicker: {
        padding: 20
    }
});
