import { Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { PostModel } from "@/lib/appwrite";
import { icons } from "../constants";
import { Video, ResizeMode, AVPlaybackStatusSuccess } from "expo-av"
const PostFrame: React.FC<PostModel> = (post) => {

    const [isPlaying, setPlaying] = useState(false)
    return (
        <View className="px-4 flex-col mb-10 items-center">
            <View className="flex flex-row  w-full justify-between">
                <View className="flex-row">
                    <View className="border-secondary border rounded-md">
                        <Image
                            source={{
                                uri: post.thumbnail,
                            }}
                            className="   w-11 h-11 rounded-md"
                            resizeMode="cover"
                        />
                    </View>
                    <View>
                        <Text className="text-white font-psemibold text-lg pl-2">
                            {post.title}
                        </Text>
                        <Text className="text-white font-plight text-xs pl-3">
                            Brand Etter
                        </Text>
                    </View>
                </View>
                <View className="pt-4 px-2">
                    <Image
                        source={icons.menu}
                        className="h-5"
                        tintColor="#ffff"
                        resizeMode="contain"
                    />
                </View>
            </View>


            <View className="h-48 w-full items-center justify-center mt-5 rounded-xl" >

                {
                    isPlaying &&

                    <View className="absolute">
                        <ActivityIndicator size="large" color="#828583" />
                    </View>
                }

                {
                    isPlaying ? (

                        <Video
                            source={{
                                uri: post.video
                            }}

                            className="w-full h-full relative justify-center items-center rounded-xl "

                            resizeMode={ResizeMode.COVER}
                            useNativeControls={true}
                            shouldPlay={isPlaying}

                            onPlaybackStatusUpdate={(status) => {

                                if (status.isLoaded) {
                                    const playbackStatus = status as AVPlaybackStatusSuccess;

                                    if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                                        setPlaying(false)
                                    }
                                } else {
                                    // Handle error or loading state
                                    console.error('Video failed to load or is not loaded yet.');
                                }
                            }}


                        />
                    ) : (
                        <TouchableOpacity activeOpacity={0.7} className="h-full w-full items-center justify-center rounded-xl" onPress={() => {
                            setPlaying(true);
                        }}>

                            <Image
                                source={{
                                    uri: post.thumbnail,
                                }}
                                className="h-full w-full rounded-xl"
                            />
                            <Image source={icons.play} className="absolute h-12 w-12 " resizeMode="contain" />
                        </TouchableOpacity>
                    )
                }

            </View>
        </View>
    );
};

export default PostFrame;
