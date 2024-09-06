import { StatusBar } from "expo-status-bar";
import {
    FlatList,
    SafeAreaView,
    Text,
    View,

} from "react-native";
import SearchInput from "@/components/SearchInput";
import { useEffect } from "react";
import { getSearchPosts } from "../../lib/use_appwrite";

import PostFrame from "@/components/PostFrame";
import { useLocalSearchParams } from 'expo-router'





const Search = () => {
    const { query } = useLocalSearchParams()
    const { data: posts, fetchLoading, reFreshData } = getSearchPosts(`${query}`)

    useEffect(() => {

        reFreshData()
    }, [query])

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id ?? ''}
                renderItem={(item) => {
                    return (
                        <PostFrame content={item.item.content} id={item.item.id} thumbnail={item.item.thumbnail} title={item.item.title} video={item.item.video} />
                    );
                }}
                ListHeaderComponent={() => {
                    return (
                        <View className="my-12 px-4">
                            <View className="flex flex-row justify-between items-center">
                                <View className="">
                                    <Text className="text-gray-100 text-base">Search result</Text>
                                    <Text className="text-gray-50 text-xl font-psemibold">
                                        {query}
                                    </Text>
                                </View>


                            </View>
                            <SearchInput inialQuery={`${query}`}
                            />

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

            />

            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
};

export default Search;
