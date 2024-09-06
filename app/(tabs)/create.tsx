import { Image, SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomFormField from '@/components/CustomFormField'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton'

const Create = () => {
    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView className="px-4 mt-12">
                <Text className="text-xl text-white font-semibold">Create Post</Text>

                <CustomFormField
                    handleOnChange={() => { }}
                    title="Video Title"
                    otherStyles="my-6"
                    placeholder="Give your a catchy title..."
                    value=""
                />

                <View>
                    <Text className="text-sm text-gray-100 font-pmedium">
                        Choose a video
                    </Text>
                    <TouchableOpacity
                        className="h-40 bg-black-100 my-3 rounded-lg items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <View className="w-14 h-14  relative border-[1px]  border-dashed border-secondary-100  justify-center items-center rounded-xl">
                            <Image
                                source={icons.upload}
                                resizeMode="contain"
                                className="h-1/2 w-1/2 "
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text className="text-sm text-gray-100 font-pmedium">
                        Thumbbnail Image
                    </Text>
                    <TouchableOpacity
                        className="h-14 bg-black-100 my-3 rounded-lg items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <View className="  flex-row gap-2 relative justify-center items-center rounded-xl">
                            <Image
                                source={icons.upload}
                                resizeMode="contain"
                                className="h-8 w-8 "
                            />
                            <Text className='text-sm text-white font-pregular'>Choose a image</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <CustomFormField
                    handleOnChange={() => { }}
                    title="AI Promt"
                    otherStyles="my-3"
                    placeholder="The AI Promt of your video"
                    value=""
                />

                <CustomButton containerStyle='my-2' handlePress={() => { }} isLoading={false} title='Submit & Upload' textStyle='' />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Create
