import {
    ScrollView,
    Text,
    View,
    SafeAreaView,
    Image,
    Button,
} from "react-native";
import { Redirect, router } from "expo-router";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { useGlobalContext } from "../context/GlobalContext";

const index = () => {
    const { isLoading, isLoggedIn } = useGlobalContext();
    if (!isLoading && isLoggedIn) {
        return <Redirect href="/home" />
    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <Toast />
            <ScrollView
                contentContainerStyle={{
                    height: "100%",
                }}
            >
                <View className="w-full  items-center h-full justify-center min-h-[80vh] px-4 py-6">
                    <Image
                        source={images.logo}
                        className="w-[130px] h-[84px]"
                        resizeMode="contain"
                    />
                    <Image
                        source={images.cards}
                        className="max-w-[350px] w-full h-[300px]"
                        resizeMode="contain"
                    />

                    <View className="relative   mt-5">
                        <Text className="text-2xl font-pbold text-white text-center ">
                            Discover Endless
                        </Text>

                        <View className="flex flex-row items-center justify-center">
                            <Text className="text-2xl font-pbold text-white text-center ">
                                Possibilites With
                            </Text>
                            <Text className="text-2xl font-pbold text-secondary-200 text-center">
                                {" "}
                                Aora
                            </Text>
                            <Image
                                source={images.path}
                                resizeMode="contain"
                                className="absolute w-[80px] -bottom-4 -right-3"
                            />
                        </View>
                    </View>

                    <Text className="text-gray-200 font-plight mt-6 text-center text-xs leading-6">
                        Where Creativity Meets Innovation: Embark on a Journey of Limitless
                        Exploration with Aora
                    </Text>

                    <CustomButton
                        containerStyle="w-full mt-8"
                        handlePress={() => {
                            router.push("./sign-in");
                        }}
                        isLoading={false}
                        textStyle=""
                        title="Continue with Email"
                    />
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
};
export default index;
