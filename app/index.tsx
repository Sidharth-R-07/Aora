import { ScrollView, Text, View, SafeAreaView, Image, ActivityIndicator } from "react-native";
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
    } else if (!isLoading && !isLoggedIn) {
        return <Redirect href="/onbording/on-bording" />

    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <Toast position="bottom" />
            <ScrollView
                contentContainerStyle={{
                    height: "100%",
                }}
            >
                <View className="w-full  items-center h-full justify-center min-h-[80vh] px-4 py-6">
                    <Image
                        source={images.logoSmall}
                        className="flex-1 w-[200px] h-[150px]"
                        resizeMode="contain"
                    />

                    <ActivityIndicator className="w-10 h-10" />

                </View>
            </ScrollView>
            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
};
export default index;
