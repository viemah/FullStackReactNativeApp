import React from 'react'
import { Stack } from 'expo-router'

const ShopLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='report' options={{ headerShown: false, animation: 'slide_from_right' }} />
    </Stack>
  )
}

export default ShopLayout
