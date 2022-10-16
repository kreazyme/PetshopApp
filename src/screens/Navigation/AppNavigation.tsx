import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { fonts, ic_heart, ic_shop, ic_store, ic_user, SCREENNAME } from "../../shared";
import colors from "../../shared/colors";
import CartScreen from "../Cart/CartScreen";
import ProfileScreen from "../Profile/ProfileScreen";
import { ShopScreen } from "../Shop";
import { WishListScreen } from "../WishList";
const Tab = createBottomTabNavigator();

const appNavigationComp = () => {
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
    return (
        <NavigationContainer>
            <Tab.Navigator
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
