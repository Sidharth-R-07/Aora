import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image,
    Alert,
} from "react-native";
import { useState } from "react";
import { images } from "@/constants";
import CustomFormField from "@/components/CustomFormField";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signInUser, getCurrentUser } from "../../lib/appwrite";

import { useGlobalContext } from "@/context/GlobalContext";
import Toast from "react-native-toast-message";
import { successToast, errorToast } from "@/components/CustomToast";

const SignIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [submitLoading, setSubmitLoading] = useState(false);
    const { setIsLoggedIn, setUser } = useGlobalContext();


    const submitFn = async () => {
        console.log("SUBMIT FUCNTION CALLED 11");


        if (!form.email || !form.password) {
            Alert.alert("Please fill all  fields");
            return;
        }
        console.log("SUBMIT FUCNTION CALLED 22");

        setSubmitLoading(true);

        try {
            await signInUser({
                email: form.email,
                password: form.password,
            });


            getCurrentUser()
                .then((user) => {
                    if (user) {
                        setIsLoggedIn(true);
                        setUser(user);
                        successToast("Signed In Successfully!");
                        router.replace("/home");
                    } else {
                        setIsLoggedIn(false);
                        setUser(null);
                        errorToast("No user found!");
                    }
                })
                .catch((error) => {
                    errorToast(error);
                })
                .finally(() => {
                    setSubmitLoading(false);
                });
        } catch (err) {
            errorToast("Something went wrong. Please try again");
            console.error(err, "ERROR SUBMITING");
        }
        setSubmitLoading(false);
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <Toast />
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
                        handlePress={submitFn}
                        isLoading={submitLoading}
                        title="Sign In"
                        textStyle=""
                    />

                    <View className="flex flex-row justify-center pt-4 px-4">
                        <Text className="text-white font-plight">
                            Don't have an account?
                        </Text>
                        <Link href="/sign-up" className="text-secondary font-psemibold">
                            {" "}
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
};

export default SignIn;
