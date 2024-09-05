import {
    Text,
    View,
    TextInput,
    Image,
    KeyboardTypeOptions,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const SearchInput: React.FC<FormFieldProps> = ({
    value,
    placeholder,
    handleOnChange,
}) => {

    return (
        <View className={`space-y-2 mt-5 `}>
            <View className="border flex flex-row  border-black-200 w-full h-14 bg-black-100 rounded-lg focus:border-secondary items-center">
                <TextInput
                    className="flex-1 w-full px-2 text-white font-pmedium  text-base"
                    placeholder={placeholder}
                    value={value}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleOnChange}
                    cursorColor="#fff"
                />

                <Image
                    source={icons.search}
                    resizeMode="contain"
                    tintColor="#fff"
                    className="h-5 w-5 mx-3"
                />

            </View>
        </View>
    );
};

export default SearchInput;

interface FormFieldProps {
    title: string;
    value: string;
    placeholder: string;
    handleOnChange: (value: string) => void;
    otherStyles: String;
    keybordType?: KeyboardTypeOptions;
}
