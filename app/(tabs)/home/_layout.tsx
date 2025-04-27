import React from 'react'
import { Stack } from 'expo-router'

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='report' options={{ headerShown: false, animation: 'slide_from_right' }} />
    </Stack>
  )
}

export default HomeLayout
