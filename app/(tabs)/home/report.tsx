import React from 'react'
import { ScrollView, View, Text, TouchableOpacity, useWindowDimensions, Image } from 'react-native'
import { icons, images } from '~/constants'
import { router } from 'expo-router'

export default function ChildDevelopmentAssessmentReport() {
  const { width } = useWindowDimensions()
  return (
    <View>
      {/* Header Section */}
      <View className='bg-[#5386c0] p-5 flex flex-row items-center justify-between'>
        <TouchableOpacity className='p-2.5' onPress={() => router.push('/home')}>
          <Image source={icons.returnIcon} className='w-7.5 h-7.5' />
        </TouchableOpacity>
        <View className='flex flex-row items-center'>
          <TouchableOpacity className='p-2.5'>
            <Image source={icons.searchIcon} className='w-7.5 h-7.5' />
          </TouchableOpacity>
          <TouchableOpacity className='p-2.5 ml-1' onPress={() => router.push('/(tabs)/shop')}>
            <Image source={icons.shoppingcartIcon} className='w-7.5 h-7.5' />
          </TouchableOpacity>
        </View>
      </View>
      <View className='bg-[#5386c0] p-5 flex items-center justify-center'>
        <Text className='text-center text-[#f3d938] text-3xl font-bold'>Child Developmental Assessment Report</Text>
      </View>

      <ScrollView>
        {/* Information Section */}
        <View className='bg-[#a9c3de] p-1'>
          <Text className='text-white text-lg font-bold left-2 mb-1'>Information</Text>
        </View>
        <View className='bg-[white] p-5'>
          <Text className='text-base my-1.25'>
            <Text className='font-bold'>Name of Child:</Text> Christine
          </Text>
          <Text className='text-base my-1.25'>
            <Text className='font-bold'>Sex:</Text> F
          </Text>
          <Text className='text-base my-1.25'>
            <Text className='font-bold'>Age:</Text> 3 years 5 months
          </Text>
          <Text className='text-base my-1.25'>
            <Text className='font-bold'>Date of Birth:</Text> 12 February 2019
          </Text>
          <Text className='text-base my-1.25'>
            <Text className='font-bold'>Date of Assessment:</Text> 12 July 2023
          </Text>
        </View>

        {/* Background Section */}
        <View className='bg-[#a9c3de] p-1'>
          <Text className='text-white text-lg font-bold left-2 mb-1'>Background</Text>
        </View>
        <View className='bg-[white] p-5'>
          <Text className='text-base'>
            Christine is a creative and joyful girl, aged 4 years and 3 months. She was born in Hong Kong and currently attends K1 at an international
            school. She lives with her parents and a domestic helper, and both Cantonese and English are spoken in their household. Due to her
            parents' full-time work commitments, Angie spends most of her time with her domestic helper, who primarily communicates in English. {'\n'}
            {'\n'}
            Christine's parents expressed their interest in understanding her developmental progress. They have noticed that Christine often struggles
            to sit still while doing homework and frequently walks away from the table before completing a task. Additionally, they have observed that
            she tends to hop as she walks on the street and has a tendency to wander off from her parents to explore things that catch her attention.
            Moreover, her parents have remarked that Christine frequently misplaces or loses her belongings.
          </Text>
        </View>

        {/* Source of Information Section */}
        <View className='bg-[#a9c3de] p-1'>
          <Text className='text-white text-lg font-bold left-2 mb-1'>Source of Information</Text>
        </View>
        <View className='bg-[white] p-5'>
          <Text className='text-base'>
            The information presented in this report is derived from interviews conducted with Christine, her parents, and Ms. Leung, as well as from
            observations of behaviours during the assessment and the results obtained from the assessment.
          </Text>
        </View>

        {/* Tests Administered Section */}
        <View className='bg-[#a9c3de] p-1'>
          <Text className='text-white text-lg font-bold left-2 mb-1'>Tests Administered</Text>
        </View>
        <View className='bg-[white] p-5'>
          <Text className='text-base'>
            In order to assess Christine's difficulties, the Canpanion Child Developmental Assessment was conducted. This interactive AI assessment
            involves the participation of both the child and the parent. It helps identify a child's developmental progress in six domains: Cognitive,
            Language, Gross Motor, Fine Motor, Social, and Self-care.
          </Text>
        </View>

        {/* Assessment Results Section */}
        <View className='bg-[#a9c3de] p-1'>
          <Text className='text-white text-lg font-bold left-2 mb-1'>Assessment Results</Text>
        </View>
        <View className='bg-[white] p-5'>
          <Image source={images.table} resizeMode='contain' className='w-[100%] h-40' />
        </View>

        {/* Comments Section */}
        <View className='bg-[#a9c3de] p-1'>
          <Text className='text-white text-lg font-bold left-2 mb-1'>Comments</Text>
        </View>
        <View className='bg-[white] p-5'>
          <Text className='text-base'>
            Christine demonstrated satisfactory problem-solving skills. Her concept of size, length, colour and shape are good, and she managed to
            perform well when asked to sort items by at least two analogies. She could locate left and right, as well as long, longer and longest. She
            performed great
          </Text>
        </View>
        <View className='bg-white h-60'></View>
      </ScrollView>
    </View>
  )
}
