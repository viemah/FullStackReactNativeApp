import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { icons, images } from '~/constants'
import data from './data.json'

const ShopPage = () => {
  return (
    <ScrollView>
      <View className='flex-1'>
        {/* White background view at the top */}
        <View className='h-[100px] bg-background' />

        <View className='flex flex-row justify-between mb-6 mr-5 ml-5'>
          <View className='items-center'>
            <Image source={images.toysAndTools} className='w-20 h-20 rounded-lg' />
            <Text className='text-[#7f7f7f] text-sm mt-2'>Toys and</Text>
            <Text className='text-[#7f7f7f] text-sm'>Tools</Text>
          </View>
          <View className='items-center'>
            <Image source={images.professionalServices} className='w-20 h-20 rounded-lg' />
            <Text className='text-[#7f7f7f] text-sm mt-2'>Professional</Text>
            <Text className='text-[#7f7f7f] text-sm'>Services</Text>
          </View>
          <View className='items-center'>
            <Image source={images.educationCentre} className='w-20 h-20 rounded-lg' />
            <Text className='text-[#7f7f7f] text-sm mt-2'>Education</Text>
            <Text className='text-[#7f7f7f] text-sm'>Centre</Text>
          </View>
          <View className='items-center'>
            <Image source={images.subscriptionPlan} className='w-20 h-20 rounded-lg' />
            <Text className='text-[#7f7f7f] text-sm mt-2'>Subscription</Text>
            <Text className='text-[#7f7f7f] text-sm'>Plan</Text>
          </View>
        </View>

        <FlatList
          data={data.categories}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View className='bg-background'>
              <View className='bg-[#5c8ec9] rounded-2xl py-3 px-4 my-2 w-4/5 mx-auto mb-4'>
                <View className='flex flex-row justify-between items-center'>
                  <Text className='text-primary font-bold text-lg'>{item.title}</Text>
                  <TouchableOpacity className='bg-[#fdde31] p-2 rounded-full'>
                    <Image source={images.arrow} className='w-6 h-6' />
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-4 mb-10'>
                {item.items.map(itemData => (
                  <View key={itemData.id} className='items-center mr-4'>
                    <Image source={{ uri: itemData.image }} className='w-24 h-24 rounded-xl' />
                    <View className='bg-yellow-400 rounded-xl z-10 opacity-80 py-1 px-3 mt-2 w-full'>
                      <Text className='text-primary font-bold'>{itemData.tags}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        />
      </View>
    </ScrollView>
  )
}

export default ShopPage
