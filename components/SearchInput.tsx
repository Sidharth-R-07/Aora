import {
    View,
    TextInput,
    Image,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput: React.FC<SearchParams> = (
    { inialQuery }
) => {
    const pathname = usePathname();

    const [query, setQuery] = useState(inialQuery || '')

    return (
        <View className={`space-y-2 mt-5 `}>
            <View className="border flex flex-row  border-black-200 w-full h-14 bg-black-100 rounded-lg focus:border-secondary items-center">
                <TextInput
                    className="flex-1 w-full px-2 text-white font-pmedium  text-base"
                    placeholder="search video"
                    value={query}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={(e) => setQuery(e)}
                    cursorColor="#fff"
                />


                <TouchableOpacity className="bg-black/25-full h-full rounded-lg flex-row items-center" onPress={() => {

                    if (!query) return;
                    if (pathname.startsWith("/search")) {
                        router.setParams({
                            query
                        })

                    } else {
                        router.push(`/search/${query}`)
                    }

                }}>
                    <View className="bg-white opacity-5 w-[1px] h-full" />
                    <Image
                        source={icons.search}
                        resizeMode="contain"
                        tintColor="#fff"
                        className="h-5 w-5 mx-3"
                    />
                </TouchableOpacity>



            </View>
        </View>
    );
};

export default SearchInput;


interface SearchParams {
    inialQuery: string;
}