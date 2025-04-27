import React from 'react'
import { View, Text, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import data from './data.json'

const DynamicPage = () => {
  const route = useRoute()

  return (
    <View className='flex-1 bg-blue-500'>
      <View className='flex-row justify-between items-center px-4 py-2 bg-blue-500'>
        <TouchableOpacity>
          <Ionicons name='arrow-back-outline' size={43} color='white' />
        </TouchableOpacity>
        <View className='flex-row space-x-4'>
          <TouchableOpacity>
            <Ionicons name='search-outline' size={40} color='white' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='cart-outline' size={43} color='white' />
          </TouchableOpacity>
        </View>
      </View>
      <View className='bg-blue-500 px-4 py-2'>
        <Text className='text-yellow-500 font-bold text-xl'>What we found on Christine...</Text>
        <Text className='text-white text-base'>
          Christine has exhibited delays in the development of her language skills. At her current age, she is not yet capable of constructing simple
          phrases. Additionally, her vocabulary appears to be relatively limited compared to what is expected for a child of her age.
        </Text>
      </View>
      <ScrollView className='flex-1 bg-white'>
        <Text className='text-blue-500 font-bold text-2xl mt-4'>SHOP</Text>
        <ScrollView horizontal className='mt-2'>
          {['Cognitive', 'Fine Motor', 'Social', 'Language', 'Gross Motor', 'Self-care'].map((tag, index) => (
            <TouchableOpacity key={index} className='bg-gray-200 rounded-full px-4 py-2 mx-2'>
              <Text>{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <FlatList
          data={Object.values(data)}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginVertical: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity className='bg-white rounded-lg shadow-md w-[48%]'>
              <Image source={{ uri: itemData.image }} className='w-full h-40 rounded-t-lg' />
              <View className='p-2'>
                <Text className='font-bold'>{item.title}</Text>
                <Text className='text-gray-500'>${item.price.toFixed(2)}</Text>
                <View className='flex-row flex-wrap'>
                  {item.tags.map((tag, index) => (
                    <Text key={index} className='bg-gray-200 rounded-full px-2 py-1 mr-2 mt-2 text-sm'>
                      {tag}
                    </Text>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  )
}

export default DynamicPage
