import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItem,
} from "@react-navigation/drawer";
import {
    Caption,
    Drawer,

} from 'react-native-paper'
import { img_avatar, ic_back, ic_close } from "../../shared";
import Icon from "react-native-vector-icons/MaterialIcons"
import BIcon from "react-native-vector-icons/MaterialCommunityIcons"
import CIcon from "react-native-vector-icons/AntDesign"
import FastImage from "react-native-fast-image";
import { DrawerActions,useNavigation } from "@react-navigation/native";

const Main_Menu = 'Main_Menu'
const Categories = 'Categories'
const avatar = img_avatar;
const DrawerContentComp = () => {
    
    const [page, setPage] = React.useState(Main_Menu);
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView>
                <HeadComponent page={page} setPage={setPage} />
                {page === Main_Menu ? <BodyComponent /> : null}
            </DrawerContentScrollView >
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="logout"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign out"
                    onPress={() => {}}
                />
            </Drawer.Section>
        </View >
    );
}
export const DrawerContent = React.memo(DrawerContentComp)
const HeadComponent = ({ page, setPage }: any) => {
    const navigation = useNavigation();
    return (
        <View style={styles.drawerContent}>
            <TouchableOpacity
                style={styles.DrawerHeaderMain}
                onPress={() => { setPage(Main_Menu) }}
                disabled={page === Main_Menu ? true : false}>
                <Text style={styles.DrawerText}>Main Menu</Text>
                {page === Main_Menu ? <View style={styles.wrapText}></View> : null}
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.DrawerHeaderCategories}
                onPress={() => { setPage(Categories) }}
                disabled={page === Categories ? true : false}>
                <Text style={styles.DrawerText}>Shop by Categories</Text>
                {page === Categories ? <View style={styles.wrapText}></View> : null}

            </TouchableOpacity>
            <TouchableOpacity style={styles.DrawerClose} 
                onPress={() => navigation.dispatch(DrawerActions.closeDrawer())} >
                <FastImage
                    source={ic_close}
                    resizeMode="contain"
                    style={styles.wrapButtonBack}
                />
            </TouchableOpacity>
        </View>
    );
}
const BodyComponent = () => {
    return (
        <View style={styles.drawerList}>
            <View style={styles.wrapAvaName}>
                <FastImage
                    source={avatar}
                    style={styles.wrapAvatar}
                    resizeMode="contain" />
                <Text style={styles.wrapName}>
                    Name
                </Text>
            </View>
            <DrawerItem
                icon={({ color, size }) => (
                    <BIcon
                        name="home-outline"
                        color={color}
                        size={size}
                    />
                )}
                label="Home"
                onPress={() => { }}
            />
            <DrawerItem
                icon={({ color, size }) => (
                    <BIcon
                        name="vector-difference"
                        color={color}
                        size={size}
                    />
                )}
                label="About"
                onPress={() => { }}
            />
            <DrawerItem
                icon={({ color, size }) => (
                    <CIcon
                        name="shoppingcart"
                        color={color}
                        size={size}
                    />
                )}
                label="Shop"
                onPress={() => { }}
            />
            <DrawerItem
                icon={({ color, size }) => (
                    <BIcon
                        name="page-previous-outline"
                        color={color}
                        size={size}
                    />
                )}
                label="Pages"
                onPress={() => { }}
            />
            <DrawerItem
                icon={({ color, size }) => (
                    <CIcon
                        name="dropbox"
                        color={color}
                        size={size}
                    />
                )}
                label="Blog"
                onPress={() => { }}
            />
            <DrawerItem
                icon={({ color, size }) => (
                    <CIcon
                        name="contacts"
                        color={color}
                        size={size}
                    />
                )}
                label="Contact"
                onPress={() => { }}
            />

        </View>
    );
}
const styles = StyleSheet.create({
    wrapText: {
        backgroundColor: "#3F3C9A",
        height: 3,
        width: "100%",
        position: 'absolute',
        bottom: 0
    },
    wrapButtonBack: {
        height: 30,
        aspectRatio: 1,
    },
    wrapAvaName: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
    },
    drawerContent: {
        backgroundColor: "#F6F5F5",
        marginTop: 30,
        height: 50,
        flexDirection: 'row',
    },
    DrawerHeaderMain: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    DrawerHeaderCategories: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    DrawerClose: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 1,
    },
    DrawerText: {
        fontSize: 15,
    },
    drawerList: {
        //borderWidth: 1,
        //height:500,
        flex: 1,
    },
    wrapAvatar: {
        height: 70,
        width: 70,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        //marginTop: 5,
    },
    wrapName: {
        fontSize: 18,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        //borderTopWidth: 1,
    },
});