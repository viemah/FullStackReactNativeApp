import { router } from 'expo-router'
import React from 'react'
import { ImageBackground, Text } from 'react-native'
import { Button } from '~/components/Common'
import { images } from '~/constants'
import { useAuth } from '~/providers/AuthProvider'

const Assessment = () => {
  const { user } = useAuth()
  const profile = user?.child.find(child => child.id === user?.currentProfileID)

  return (
    <ImageBackground source={images.assessmentBg} className='flex-1 justify-center items-center'>
      <Text className='font-semibold text-4xl text-center text-white/80 mt-10'>Hello {profile?.name ?? ''}</Text>
      <Text className='font-semibold text-4xl text-center text-white/80 mt-10'>Ready to take your Assessment?</Text>
      <Button text='Start' buttonStyle='w-[60%] mt-10 bg-primary/20 border-2 border-border' handlePress={() => router.navigate('/game')} />
    </ImageBackground>
  )
}

export default Assessment
