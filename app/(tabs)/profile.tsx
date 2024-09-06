import { StatusBar } from "expo-status-bar";
import {
    FlatList,
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import { icons } from "@/constants";
import { getUserPosts } from "../../lib/use_appwrite";

import PostFrame from "@/components/PostFrame";
import { useGlobalContext } from "@/context/GlobalContext";

const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    const {
        data: posts,
        fetchLoading,
        reFreshData,
    } = getUserPosts(`${user?.accountid}`);

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
                        <View className="my-12 px-4 items-center">

                            <TouchableOpacity
                                activeOpacity={0.7}
                                className="w-full items-end pr-2">
                                <Image
                                    source={icons.logout}
                                    resizeMode="contain"
                                    className="h-6 w-6"
                                />
                            </TouchableOpacity>
                            <View className="border-secondary border rounded-xl relative  w-16 h-16 ">
                                <Image
                                    source={{
                                        uri: user?.avatar,
                                    }}
                                    className="   w-full h-full rounded-xl"
                                    resizeMode="cover"
                                />
                            </View>

                            <Text className="text-white font-psemibold text-lg pl-2 mt-2">
                                {user?.username}
                            </Text>
                            <Text className="text-white font-plight text-[9px] pl-3">
                                {user?.email}
                            </Text>
                            <View className="flex-row gap-6">
                                <View className="items-center">
                                    <Text className="text-white font-psemibold text-2xl pl-3 mt-3">
                                        12
                                    </Text>
                                    <Text className="text-white font-pregular text-sm pl-3">
                                        Posts
                                    </Text>
                                </View>
                                <View className="items-center">
                                    <Text className="text-white font-psemibold text-2xl pl-3 mt-3">
                                        1.3k
                                    </Text>
                                    <Text className="text-white font-pregular text-sm pl-3">
                                        Views
                                    </Text>
                                </View>

                            </View>




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

export default Profile;
