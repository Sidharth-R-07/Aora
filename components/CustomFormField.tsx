import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardTypeOptions,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const CustomFormField: React.FC<FormFieldProps> = ({
    title,
    value,
    placeholder,
    handleOnChange,
    otherStyles,
    keybordType,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className=" text-sm text-gray-100 font-pmedium">{title}</Text>
            <View className="border flex flex-row  border-black-200 w-full h-14 bg-black-100 rounded-lg focus:border-secondary items-center">
                <TextInput
                    className="flex-1 w-full px-2 text-white font-pregular  text-base"
                    placeholder={placeholder}
                    value={value}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleOnChange}
                    cursorColor="#fff"
                    secureTextEntry={title === "Password" && !showPassword}

                    keyboardType={keybordType}
                />
                {title === "Password" && (
                    <TouchableOpacity
                        className="w-9"
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={showPassword ? icons.eyeHide : icons.eye}
                            resizeMode="contain"
                            tintColor="#7b7b8b"
                            className="h-6 w-6"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default CustomFormField;

interface FormFieldProps {
    title: string;
    value: string;
    placeholder: string;
    handleOnChange: (value: string) => void;
    otherStyles: String;
    keybordType?: KeyboardTypeOptions;
}
