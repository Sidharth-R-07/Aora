import { FlatList, Text, View } from "react-native";
import React from "react";
import { PostModel } from "@/lib/appwrite";

const TrendingPosts: React.FC<TrendingPostsProps> = ({ posts }) => {
    return (
        <FlatList
            className="mt-6"
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={(item) => {
                return (
                    <View>
                        <Text>{item.item.id}</Text>
                    </View>
                );
            }}
            horizontal
        />
    );
};

export default TrendingPosts;

interface TrendingPostsProps {
    posts: PostModel[];
}

