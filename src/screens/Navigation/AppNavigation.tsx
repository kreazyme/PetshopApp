import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import FastImage from "react-native-fast-image";
import { fonts, ic_heart, ic_shop, ic_store, ic_user, SCREENNAME } from "../../shared";
import colors from "../../shared/colors";
import CartScreen from "../Cart/CartScreen";
import { EditProfileScreen } from "../Profile/EditProfileScreen";
import ProfileScreen from "../Profile/ProfileScreen";
import { DetailProductScreen, ShopScreen } from "../Shop";
import { WishListScreen } from "../WishList";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerScreen } from "../Drawer";
import { DrawerContent } from "../Drawer/DrawerContent"
import { LoginScreen } from "../Authentication";
import { useSelector } from "react-redux";

const appNavigationComp = () => {

    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const Drawer = createDrawerNavigator();
    const token = useSelector(state => state?.appReducer.token);
    console.log("Token: " + token)
    const tabbarIcon = ((focus: any, icon: any, txtName: String) => {
        return (
            <View style={styles.wrapIconTabbar}>
                <FastImage
                    style={styles.wrapIcon}
                    source={icon}
                    tintColor={focus ? colors.orangeTabbar : colors.grayTabbar}
                />
                {
                    focus &&
                    <Text style={styles.txtTabbarFocus}>{txtName}</Text>
                }
            </View>
        )
    })

    const HomeStack = (() => {
        return <Tab.Navigator
            tabBarOptions={{
                style: styles.wrapTabbar
            }}
        >
            <Tab.Screen
                name={SCREENNAME.SHOP_SCREEN}
                component={ShopScreen}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ focused }) => { return tabbarIcon(focused, ic_store, "Shop") }
                }}
            />
            <Tab.Screen
                name={SCREENNAME.CART_SCREEN}
                component={CartScreen}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ focused }) => { return tabbarIcon(focused, ic_shop, "Cart") }
                }}
            />
            <Tab.Screen
                name={SCREENNAME.WISHLIST_SCREEN}
                component={WishListScreen}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ focused }) => { return tabbarIcon(focused, ic_heart, "WishList") }
                }}
            />
            <Tab.Screen
                name={SCREENNAME.PROFILE_SCREEN}
                component={ProfileScreen}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ focused }) => { return tabbarIcon(focused, ic_user, "Profile") }
                }}
            />
        </Tab.Navigator>

    })

    const HomeDrawer = (() => {
        return <Stack.Navigator
            initialRouteName={token.length === 0 ? SCREENNAME.LOGIN_SCREEN : SCREENNAME.HOME_STACK
            }>
            <Stack.Screen
                name={SCREENNAME.LOGIN_SCREEN}
                options={{ headerShown: false }}
                component={LoginScreen}
            />
            <Stack.Screen
                name={SCREENNAME.HOME_STACK}
                options={{ headerShown: false }}
                component={HomeStack}
            />
            <Stack.Screen
                name={SCREENNAME.DETAIL_PRODUCT_SCREEN}
                options={{ headerShown: false }}
                component={DetailProductScreen}
            />
            <Stack.Screen
                name={SCREENNAME.EDIT_PROFILE_SCREEN}
                options={{ headerShown: false }}
                component={EditProfileScreen}
            />
        </Stack.Navigator>
    })

    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName={SCREENNAME.HOME_DRAWER}
                drawerContent={props => <DrawerContent />}>
                <Drawer.Screen
                    options={{ headerShown: false }}
                    name={"Homepage"}
                    component={HomeDrawer}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export const AppNavigation = React.memo(appNavigationComp)

const styles = StyleSheet.create({
    container: {
    },
    tabbarStyle: {
        height: 90
    },
    wrapIconTabbar: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
    },
    wrapIcon: {
        height: 25,
        aspectRatio: 1,
        justifyContent: "center",
    },
    txtTabbarFocus: {
        fontSize: fonts.font16,
        color: colors.orangeTabbar,
    },
    wrapTabbar: {
        height: 60,
        padding: 12,
        margin: 12,
        borderRadius: 10
    }
});
