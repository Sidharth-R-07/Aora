import { Text, View, SafeAreaView, ScrollView, Image, Alert } from "react-native";
import { useState } from "react";
import { images } from "@/constants";
import CustomFormField from "@/components/CustomFormField";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import Toast from "react-native-toast-message";



import { successToast, errorToast } from "@/components/CustomToast";

const SignUp = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        userName: "",
    });
    const [submitLoading, setSubmitLoading] = useState(false);

    const submitFn = async () => {
        console.log("SUBMIT FUCNTION CALLED");

        if (!form.email || !form.password || !form.userName) {
            errorToast("Please fill all  fields")
            return;
        }

        setSubmitLoading(true);

        try {


            await createUser({
                email: form.email,
                name: form.userName,
                password: form.password,
            });

            successToast("User created successfully");
            router.replace('/home')
        } catch (err) {
            errorToast(`Error creating user:${err}`)
            console.error(err, "ERROR SUBMITING");
        }

        setSubmitLoading(false);

    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <Toast position="bottom" />
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        className="w-[115px] h-[35px]"
                    />

                    <Text className="mt-8 text-2xl  text-white font-psemibold">
                        Sign Up
                    </Text>
                    <CustomFormField
                        title="User Name"
                        placeholder="Enter your username"
                        value={form.userName}
                        handleOnChange={(value) => {
                            setForm({ ...form, userName: value });
                        }}
                        keybordType={"name-phone-pad"}
                        otherStyles="mt-7"
                    />
                    <CustomFormField
                        title="Email"
                        placeholder="Enter your email address"
                        value={form.email}
                        handleOnChange={(value) => {
                            setForm({ ...form, email: value });
                        }}
                        keybordType={"email-address"}
                        otherStyles="mt-5"
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

                    <CustomButton
                        containerStyle="mt-10"
                        handlePress={submitFn}
                        isLoading={submitLoading}
                        title="Sign Up"
                        textStyle=""
                    />

                    <View className="flex flex-row justify-center pt-4 px-4">
                        <Text className="text-white font-plight">
                            Already have an account?
                        </Text>
                        <Link href="/sign-in" className="text-secondary font-psemibold">
                            {" "}
                            Sign In
                        </Link>
                    </View>
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
};

export default SignUp;
