import React from 'react'
import { View, Text, FlatList, ScrollView, TouchableOpacity, Linking, useWindowDimensions, ImageBackground, Image } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { icons, images } from '~/constants'
import { useAuth } from '~/providers/AuthProvider'
import { Button } from '~/components/Common'
import { router } from 'expo-router'

const socialMediaLinks = [
  { icon: icons.facebook, url: 'https://www.facebook.com/people/Canpanionhk/100091474226557/' },
  { icon: icons.linkedIn, url: 'https://www.linkedin.com/company/canpanion-group/' },
  { icon: icons.instagram, url: 'https://www.instagram.com/canpanionhk/' },
]

const services = [
  { name: 'Language Genius', image: images.languageGenius },
  { name: 'Buddy Builder', image: images.educationCentre },
  { name: 'Behavior Therapist', image: images.professionalServices },
  { name: 'Play Therapy', image: images.toysAndTools },
  { name: 'Positive Psychology', image: images.subscriptionPlan },
  { name: 'Sensory Event', image: images.sensoryEvent },
]

const infoPages = [
  {
    title: 'Toys and Tools',
    content: 'Our professionals provide videos and content on multiple ways to engage with our globally sourced toys and tool',
  },
  { title: 'Home Learning Guide', content: 'Learn through play with Christine anywhere and anytime with our guide' },
  {
    title: 'Professional Services',
    content: "Over 30+ therapists, psychologists, child development centre,  professional service providers to support Christine's growth",
  },
  { title: 'AI Training Games', content: 'Excel with our progress tracking, immersive and engagement games' },
]
const name = 'Christine'

const HomePage = () => {
  const { width } = useWindowDimensions()
  return (
    <View className='flex-1'>
      {/* Scroll View */}
      <ScrollView className='flex-1'>
        {/* Background Image with Flat List */}
        <View className='relative'>
          <Image source={images.bgHome} resizeMode='cover' className='w-full h-[300px]' />
          <View className='absolute top-0 left-0 right-0 bg-transparent py-7 px-6 z-10'>
            <View className='flex-row justify-between items-center'>
              <TouchableOpacity>
                <Ionicons name='person-circle-outline' size={43} color='white' />
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
          </View>
        </View>

        {/* White Box */}
        <View className='absolute top-[200px] left-4 right-4 bg-white p-9 rounded-lg shadow-md'>
          <Text className='text-foreground font-bold text-lg'>Professional AI-driven Assessment for {name}</Text>
          <View className='mt-4'>
            <Text className='text-gray-500'>Milestones</Text>
            <Text className='text-gray-500'>Gifted & Strengths & Weaknesses</Text>
            <Text className='text-gray-500'>Suspected SEN</Text>
          </View>
          <TouchableOpacity className='bg-[#fdde31] py-2 px-4 rounded-md absolute bottom-2 right-2' onPress={() => router.push('/home/report')}>
            <Text className='text-white font-medium'>Full Report</Text>
          </TouchableOpacity>
        </View>

        {/* Personalized Services */}
        <View className='bg-white py-1 px-4 pt-16'>
          <Text className='text-black font-bold text-lg'>{name}'s Personalized Services</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal className='mt-4'>
            {services.map((service, index) => (
              <View key={index} className='rounded-md items-center justify-center'>
                <Image source={service.image} className='w-20 h-20' resizeMode='contain' />
                <Text className='text-black font-medium mt-2'>{service.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Info Pages */}
        <View>
          <ImageBackground source={images.section2} className='w-full' resizeMode='cover'>
            <View className='items-center mt-20'>
              <View className='w-[90%]'>
                <FlatList
                  data={infoPages}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ width: width * 0.9 }} className='h-[170px] bg-gray-200 p-6 justify-center items-center'>
                        <Text className='text-black font-bold text-center'>{item.title}</Text>
                        <Text
                          className='text-gray-500 text-center'
                          style={{
                            flexWrap: 'wrap',
                            marginVertical: 7,
                          }}>
                          {item.content}
                        </Text>
                      </View>
                    )
                  }}
                />
              </View>

              <View className='flex items-center justify-center h-full'>
                <View className='flex flex-row items-center w-full justify-end'>
                  <Text className='text-[#003366] text-2xl font-bold mr-6'>Social Media</Text>
                  <View className='w-40 h-[2px] bg-[#003366]'></View>
                </View>
              </View>

              <View className='flex flex-row items-center w-full mt-28'>
                <View className='flex flex-row items-center justify-end w-full'>
                  <View className='flex-1 h-[2px] bg-[#3b6da8] mr-6'></View>
                  <Text className='text-[#3b6da8] text-4xl font-bold mr-4'>Social Media</Text>
                </View>
              </View>

              <View className='flex flex-row justify-center items-center space-x-4 h-[500px]'>
                <TouchableOpacity
                  onPress={() => {
                    router.push('https://www.instagram.com/canpanionhk/?igsh=MXdycTdvd2NrOHdzYQ%3D%3D&utm_source=qr')
                  }}>
                  <Image source={icons.instagram} className='w-16 h-16' />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    router.push('https://www.facebook.com/profile.php?id=100091474226557')
                  }}>
                  <Image source={icons.facebook} className='w-[90px] h-[90px]' resizeMode='center' />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    router.push('https://www.linkedin.com/company/canpanion-group/?viewAsMember=true')
                  }}>
                  <Image source={icons.linkedIn} className='w-16 h-16' />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomePage
