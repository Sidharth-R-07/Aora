import { Text, View, Image } from 'react-native'
import React from 'react'
import { PostModel } from '@/lib/appwrite';
import { icons } from '../constants';

const PostFrame: React.FC<PostModel> = (post) => {
    return (
        <View className='px-4 flex-col mb-10 items-center'>
            <View className='flex flex-row  w-full justify-between'>
                <View className='flex-row'>
                    <View className='border-secondary border rounded-md'>
                        <Image source={{
                            uri: post.thumbnail
                        }} className='   w-11 h-11 rounded-md' resizeMode='cover' />
                    </View>
                    <View>
                        <Text className='text-white font-psemibold text-lg pl-2'>{post.title}</Text>
                        <Text className='text-white font-plight text-xs pl-3'>Brand Etter</Text>
                    </View>

                </View>
                <View className='pt-4 px-2'>
                    <Image source={icons.menu} className='h-5' tintColor="#ffff" resizeMode='contain' />
                </View>
            </View>

            <Image source={{
                uri: post.thumbnail
            }} className='h-40 w-full mt-5 rounded-lg' />



        </View>
    )
}

export default PostFrame;
