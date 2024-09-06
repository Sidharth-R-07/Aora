import {
    FlatList,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { PostModel } from "@/lib/appwrite";
import { getLatestPosts } from "@/lib/use_appwrite";
import * as Animateble from "react-native-animatable";
import { Video, ResizeMode, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import { icons } from "@/constants";

const TrendingPosts = () => {
    const { data: posts, fetchLoading, reFreshData } = getLatestPosts();

    const [activeItem, setActiveItem] = useState<PostModel | null>(posts[0]);

    return (
        <View className="mt-6">
            <Text className="text-sm font-pregular text-gray-100">Latest Videos</Text>
            <FlatList
                className="mt-3 h-60 w-full"
                data={posts}
                keyExtractor={(item) => item.id ?? ""}
                renderItem={(item) => {
                    return (
                        <TrendingPost
                            activeItem={activeItem ?? posts[0]}
                            item={item.item}
                        />
                    );
                }}
                horizontal
            />
        </View>
    );
};

export default TrendingPosts;

const TrendingPost: React.FC<TrendingPostProps> = (post) => {
    const [playing, setPlaying] = useState(false);

    return (
        <Animateble.View className="w-44 h-full mx-3 justify-center items-center shadow-lg bg-gray-900 shadow-black/40 rounded-2xl overflow-hidden">

            {
                playing &&

                <View className="absolute">
                    <ActivityIndicator size="large" color="#828583" />
                </View>
            }

            {playing ? (

                <TouchableOpacity
                    className="w-full h-full"
                    activeOpacity={0.8}
                    onPress={() => setPlaying(false)}
                >
                    <Video
                        source={{
                            uri: post.item.video
                        }}
                        className="w-full h-full relative justify-center items-center "
                        resizeMode={ResizeMode.COVER}
                        useNativeControls={false}
                        shouldPlay={playing}
                        onPlaybackStatusUpdate={(status) => {

                            if (status.isLoaded) {
                                const playbackStatus = status as AVPlaybackStatusSuccess;
                                if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                                    setPlaying(false)
                                }
                            } else {
                                console.error('Video failed to load or is not loaded yet.');
                            }
                        }}
                    />


                </TouchableOpacity>

            ) : (
                <TouchableOpacity
                    className="w-full h-full relative justify-center items-center "
                    activeOpacity={0.6}
                    onPress={() => setPlaying(true)}
                >
                    <ImageBackground
                        source={{
                            uri: post.item.thumbnail,
                        }}
                        resizeMode="cover"
                        className="w-full h-full"
                    />

                    <Image
                        source={icons.play}
                        className="h-9 w-9 absolute"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </Animateble.View>
    );
};

const zoomIn = {
    from: {
        scale: 0.9,
    },
    to: {
        scale: 1,
    },
};

const zoomOut = {
    from: {
        scale: 1,
    },
    to: {
        scale: 0.9,
    },
};

interface TrendingPostProps {
    item: PostModel;
    activeItem?: PostModel;
}
