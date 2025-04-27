import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='sign-in'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='sign-up'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='verify-email'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='acct-setup'
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  )
}

export default AuthLayout
