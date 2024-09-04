import { TouchableOpacity, Text } from "react-native";

const CustomButton: React.FC<ButtonProps> = ({
    handlePress,
    containerStyle,
    isLoading,
    title,
    textStyle,
}) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
            className={`bg-secondary h-[50px] justify-center items-center rounded-xl ${containerStyle} ${isLoading ? "opacity-50" : ""
                }`}
        >
            <Text className={`font-psemibold text-[16px] ${textStyle}`}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

interface ButtonProps {
    title: string;
    handlePress: () => void;
    textStyle: string;
    containerStyle: string;
    isLoading: boolean;
}
