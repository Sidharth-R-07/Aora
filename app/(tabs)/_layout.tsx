import { Text, View, Image, ImageSourcePropType } from "react-native";

import { Tabs, Redirect } from "expo-router";
// import React from 'react';
import { icons } from "../../constants";

const TabIcon: React.FC<TabIconModel> = ({ focused, color, name, icon }) => {
    const imageSource: ImageSourcePropType =
        typeof icon === "string" ? { uri: icon } : icon;

    return (
        <View className="justify-center items-center gap-2">
            <Image
                source={imageSource}
                resizeMode="contain"
                tintColor={color}
                className="h-6 w-6 "
            />
            <Text
                className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
                style={{ color: color }}
            >
                {name}
            </Text>
        </View>
    );
};

const TabLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#FFA001",
                    tabBarInactiveTintColor: "#CDCDE0",
                    tabBarStyle: {
                        backgroundColor: "#161622",
                        borderTopWidth: 1,
                        borderTopColor: "#232533",
                        height: 80,
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,

                        tabBarIcon: ({ focused, color }) => {
                            return (
                                <TabIcon
                                    icon={icons.home}
                                    focused={focused}
                                    color={color}
                                    name="Home"
                                />
                            );
                        },
                    }}
                />
                <Tabs.Screen
                    name="bookmark"
                    options={{
                        title: "Bookmark",
                        headerShown: false,

                        tabBarIcon: ({ focused, color }) => (
                            <TabIcon
                                icon={icons.bookmark}
                                focused={focused}
                                color={color}
                                name="Bookmark"
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: "Creat",
                        headerShown: false,

                        tabBarIcon: ({ focused, color }) => (
                            <TabIcon
                                icon={icons.plus}
                                focused={focused}
                                color={color}
                                name="Create"
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown: false,

                        tabBarIcon: ({ focused, color }) => (
                            <TabIcon
                                icon={icons.profile}
                                focused={focused}
                                color={color}
                                name="Profile"
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabLayout;

interface TabIconModel {
    focused: boolean;
    color: string;
    name: string;
    icon: string | ImageSourcePropType;
}
