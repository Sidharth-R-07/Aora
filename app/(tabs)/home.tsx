import { StatusBar } from "expo-status-bar";
import {
    FlatList,
    SafeAreaView,
    Text,
    View,
    Image,
    RefreshControl,
} from "react-native";
import { images } from "../../constants";
import SearchInput from "@/components/SearchInput";
import TrendingPosts from "@/components/TrendingPosts";
import { useState } from "react";
import { getAllPosts } from "../../lib/use_appwrite";
import React from "react";
import PostFrame from "@/components/PostFrame";

const Home = () => {
    const [refreshLoading, setRefreshLoading] = useState(false);
    const { data: posts, fetchLoading, reFreshData } = getAllPosts();

    const handleRefresh = async () => {
        setRefreshLoading(true);
        await reFreshData!();
        setRefreshLoading(false);
    };
    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id ?? ""}
                renderItem={(item) => {
                    return (
                        <PostFrame
                            content={item.item.content}
                            id={item.item.id}
                            thumbnail={item.item.thumbnail}
                            title={item.item.title}
                            video={item.item.video}
                        />
                    );
                }}
                ListHeaderComponent={() => {
                    return (
                        <View className="my-12 px-4">
                            <View className="flex flex-row justify-between items-center">
                                <View className="">
                                    <Text className="text-gray-100 text-base">Welcome Back</Text>
                                    <Text className="text-gray-50 text-xl font-psemibold">
                                        Sidharth
                                    </Text>
                                </View>

                                <Image
                                    source={images.logoSmall}
                                    className="w-8 h-8"
                                    resizeMode="contain"
                                />
                            </View>
                            <SearchInput inialQuery="" />
                            <TrendingPosts />
                        </View>
                    );
                }}
                ListEmptyComponent={() => {
                    return (
                        <View className="flex items-center">
                            <Text className="text-gray-100 text-base font-pregular">
                                No videos found
                            </Text>
                        </View>
                    );
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshLoading}
                        onRefresh={handleRefresh}
                    />
                }
            />

            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
};

export default Home;
