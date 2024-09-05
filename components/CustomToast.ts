import Toast from "react-native-toast-message";

export const successToast = (text: string) => {
  Toast.show({
    type: "success",
    text1: "Success",
    text2: text,
  });
};

export const errorToast = (text: string) => {
  Toast.show({
    type: "error",
    text1: "Error",
    text2: text,
  });
};
