import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import { Redirect, router, useLocalSearchParams } from 'expo-router'
import { OtpInput } from 'react-native-otp-entry'

import axios from '~/lib/axios'
import VerifyEmailIcon from '@/assets/svg/VerifyEmailIcon.svg'
import { useAuth } from '~/providers/AuthProvider'
import { useColorScheme } from '~/lib/useColorScheme'
import { NAV_THEME } from '~/lib/constants'
import { UNEXPECTED_ERROR } from '~/constants/errorMessage'
import { Loader } from '~/components/Common'

const VerifyEmail = () => {
  const { loggedIn, refreshSession, logout } = useAuth()
  const { colorScheme } = useColorScheme()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  const getEmail = async () => {
    const response = await axios.get('/user/me/email')
    if (response.status === 200) {
      setEmail(response.data.email)
    }
  }

  const sendEmail = async () => {
    try {
      const response = await axios.get('/auth/register/send-verification-email')
      // status 204 = already verified, access token might be old. Refresh.
      if (response.status === 204) {
        await refreshSession()
      }
    } catch (error: any) {
      setError(error?.response?.data ?? UNEXPECTED_ERROR)
      setMessage('')
    }
  }

  const resendEmail = () => {
    setMessage('The email has been resent.')
    setError('')
    sendEmail()
  }

  const verifyEmail = async (otp: string) => {
    setLoading(true)
    try {
      const response = await axios.post('/auth/register/verify-app-token', {
        token: otp,
      })
      if (response.status === 200) {
        await refreshSession()
        router.replace('/acct-setup')
      }
    } catch (error: any) {
      setError(error.response?.data ?? UNEXPECTED_ERROR)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getEmail()
    sendEmail()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (loggedIn?.emailVerified) return <Redirect href={!loggedIn.valid ? '/acct-setup' : '/home'} />

  return (
    <SafeAreaView>
      <Loader isLoading={loading} transparent={true} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView className='h-full' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View className='h-full justify-center items-center text-center'>
            <Text className='text-foreground font-semibold text-3xl mb-4'>Verify your email</Text>

            <VerifyEmailIcon width={300} height={230} />

            <Text className='text-foreground font-light px-4 text-center text-lg mb-4'>
              Please enter the verification code we send to <Text className='font-semibold'>{email}</Text> to complete your account setup.
            </Text>

            <View className='px-4 items-center pt-10'>
              {error && <Text className='absolute top-0 text-destructive text-lg font-regular'>{error}</Text>}
              {!error && message && <Text className='absolute top-0 text-foreground text-lg font-regular'>{message}</Text>}
              <OtpInput
                numberOfDigits={6}
                focusColor={NAV_THEME[colorScheme]['secondary']}
                focusStickBlinkingDuration={500}
                onFilled={otp => verifyEmail(otp)}
                textInputProps={{
                  accessibilityLabel: 'One-Time Password',
                  keyboardType: 'numeric',
                }}
                theme={{
                  pinCodeContainerStyle: { backgroundColor: NAV_THEME[colorScheme]['accent'] },
                  pinCodeTextStyle: { color: NAV_THEME[colorScheme]['text'] },
                }}
              />
            </View>

            <View className='flex-row justify-center items-center mt-20'>
              <Text className='text-foreground font-light text-center text-lg'>Didn't receive an email?</Text>
              <TouchableOpacity onPress={resendEmail}>
                <Text className='text-foreground font-semibold text-center text-lg ml-2'>Resend it.</Text>
              </TouchableOpacity>
            </View>
            <View className='flex-row justify-center items-center mt-2'>
              <Text className='text-foreground font-light text-center text-lg'>Not this email?</Text>
              <TouchableOpacity onPress={() => logout()}>
                <Text className='text-foreground font-semibold text-center text-lg ml-2'>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default VerifyEmail
