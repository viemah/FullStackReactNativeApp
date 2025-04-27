import React from 'react'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, Text, View } from 'react-native'
import { images } from '~/constants'
import { Button, Loader } from '~/components/Common'
import { useAuth } from '~/providers/AuthProvider'

const Welcome = () => {
  const { loading, loggedIn } = useAuth()

  if (!loading && loggedIn) return <Redirect href={!loggedIn.emailVerified ? '/verify-email' : !loggedIn.valid ? '/acct-setup' : '/home'} />

  return (
    <SafeAreaView>
      <Loader isLoading={loading} />
      <View className='w-full h-full flex justify-center items-center px-4'>
        <Image source={images.logo} className='w-[250px] h-[80px]' resizeMode='contain' />
        <Image source={images.cards} className='max-w-[380px] w-[90%] h-[30%]' resizeMode='contain' />
        <View className='relative mt-10'>
          <Text className='text-3xl text-foreground font-bold text-center'>
            Start your Journey{'\n'}
            with <Text className='text-foreground'>Canpanion</Text>
          </Text>
          <Image source={images.path} className='w-[250px] h-[20px] absolute -bottom-3 -right-16' resizeMode='contain' />
        </View>
        <Button text='Log in' handlePress={() => router.push('/sign-in')} buttonStyle='h-[60px] w-[80%] mt-12 rounded-3xl' />
        <Text onPress={() => router.push('/sign-up')} className='text-foreground text-center font-semibold text-lg w-full p-4'>
          Create an account?
        </Text>
        <Text onPress={() => router.replace('/home')} className='text-muted-foreground text-center w-36 mt-6 p-4'>
          Skip for now
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default Welcome
