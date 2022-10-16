import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { fonts, ic_shop, ic_user, SCREENNAME } from "../../shared";
import colors from "../../shared/colors";
import CartScreen from "../Cart/CartScreen";
import ProfileScreen from "../Profile/ProfileScreen";
const Tab = createBottomTabNavigator();

const appNavigationComp = () => {
    const tabNull = (() => {
        return <></>
    })
    return (
        <NavigationContainer>
            <Tab.Navigator
            >
                <Tab.Screen
                    name={SCREENNAME.CART_SCREEN}
                    component={CartScreen}
                    options={{
                        tabBarLabel: "",
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={styles.wrapIconTabbar}>
                                    <FastImage
                                        style={styles.wrapIcon}
                                        source={ic_shop}
                                        tintColor={focused ? colors.orangeTabbar : colors.grayTabbar}
                                    />
                                    <Text style={focused ? styles.txtTabbarFocus : styles.txtTabbar}>{focused ? "Cart" : ""}</Text>
                                </View>
                            )
                        }
                    }}
                />
                <Tab.Screen
                    name={SCREENNAME.PROFILE_SCREEN}
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "",
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={styles.wrapIconTabbar}>
                                    <FastImage
                                        style={styles.wrapIcon}
                                        source={ic_user}
                                        tintColor={focused ? colors.orangeTabbar : colors.grayTabbar}
                                    />
                                    <Text style={focused ? styles.txtTabbarFocus : styles.txtTabbar}>{focused ? "Profile" : ""}</Text>
                                </View>
                            )
                        }
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
        alignItems: "center"
    },
    wrapIcon: {
        height: 25,
        aspectRatio: 1
    },
    txtTabbarFocus: {
        fontSize: fonts.font16,
        color: colors.orangeTabbar
    },
    txtTabbar: {
        fontSize: fonts.font16,
        color: colors.grayTabbar
    }
});
