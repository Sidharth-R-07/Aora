import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image,
} from "react-native";
import { useState } from "react";
import { images } from "@/constants";
import CustomFormField from "@/components/CustomFormField";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SignIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [submitLoading, setSubmitLoading] = useState(false);

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center h-[85vh] px-4 my-6">
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        className="w-[115px] h-[35px]"
                    />

                    <Text className="mt-8 text-2xl  text-white font-psemibold">
                        Sign In to Aora
                    </Text>
                    <CustomFormField
                        title="Email"
                        placeholder="Enter your email address"
                        value={form.email}
                        handleOnChange={(value) => {
                            setForm({ ...form, email: value });
                        }}
                        keybordType={"email-address"}
                        otherStyles="mt-7"
                    />
                    <CustomFormField
                        title="Password"
                        placeholder="Enter your password"

                        value={form.password}
                        handleOnChange={(value) => {
                            setForm({ ...form, password: value });
                        }}
                        otherStyles="mt-5"
                    />

                    <View className="flex items-end px-1">
                        <Text className="mt-4 text-white">Forgot Password?</Text>
                    </View>

                    <CustomButton
                        containerStyle="mt-10"
                        handlePress={() => {

                            console.log("Sign In Clicked")
                        }}
                        isLoading={submitLoading}
                        title="Sign In"
                        textStyle=""
                    />

                    <View className="flex flex-row justify-center pt-4 px-4">
                        <Text className="text-white font-plight">Don't have an account?</Text>
                        <Link href="/sign-up" className="text-secondary font-psemibold">  Sign Up</Link>
                    </View>
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
};

export default SignIn;

