import { Text, View } from 'react-native'
import { Link } from 'expo-router'

const index = () => {
    return (
        <View className='flex-1 items-center justify-center text-center' >
            <Text className='text-4xl text-red-700 font-bold'>Hello Wolrd</Text>
            <Link href="/profile" className=' bg-slate-500 py-2 px-8 rounded-lg mt-10 text-white text-lg font-semibold'>Go to Profile</Link>
        </View>
    )
}

export default index

