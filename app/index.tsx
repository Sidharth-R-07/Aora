import { ScrollView, Text, View, SafeAreaView, Image } from 'react-native'
import { Link } from 'expo-router'

import { images } from '@/constants'

const index = () => {
    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView contentContainerStyle={{
                height: '100%',
            }}>

                <View className='w-full  items-center h-full px-4 py-6'>

                    <Image source={images.logo} className='w-[130px] h-[84px]' resizeMode='contain' />
                    <Image source={images.cards} className='max-w-[350px] w-full h-[300px]' resizeMode='contain' />

                    <View className='relative   mt-5'>
                        <Text className='text-2xl font-pbold text-white text-center '>Discover Endless</Text>

                        <View className='flex flex-row items-center justify-center'>

                            <Text className='text-2xl font-pbold text-white text-center '>Possibilites With</Text>
                            <Text className='text-2xl font-pbold text-secondary-200 text-center'> Aora</Text>
                            <Image source={images.path} resizeMode='contain' className='absolute w-[80px] -bottom-4 -right-3' />
                        </View>

                    </View>

                </View>


            </ScrollView>



        </SafeAreaView >
    )
}
export default index

