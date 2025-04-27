import React, { useState } from 'react'
import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import images from '~/constants/images'
import { useAuth } from '~/providers/AuthProvider'
import { Button, FormField } from '~/components/Common'

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    user: '',
    password: '',
    formError: '',
  })
  const { signin } = useAuth()

  const navigateTo = (href: string) => {
    while (router.canGoBack()) router.back()
    router.replace(href)
  }

  const submit = async () => {
    // Form validation
    if (form.user === '' || form.password === '') {
      setForm({ ...form, formError: 'Please fill in all fields' })
      return
    }

    // Start Sign in process
    setSubmitting(true)

    const response = await signin({ user: form.user, password: form.password })
    if (!response.success) {
      setForm({ ...form, formError: response.error ?? '' })
    } else {
      if (!response.loggedIn?.emailVerified) navigateTo('/verify-email')
      else if (!response.loggedIn?.valid) navigateTo('/acct-setup')
      else navigateTo('/home')
    }

    setSubmitting(false)
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView className='h-full' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View className='w-full h-full flex justify-center px-6 mt-6 mb-12'>
            <View className='items-center'>
              <Image source={images.logo} resizeMode='contain' className='w-[80%] h-[70px] mb-6' />
              {form.formError && <Text className='absolute bottom-0 text-red-400 text-base font-regular'>{form.formError}</Text>}
            </View>

            <FormField
              title='Username or Email'
              value={form.user}
              handleChangeText={text => setForm({ ...form, user: text })}
              keyboardType='email-address'
            />
            <FormField title='Password' value={form.password} handleChangeText={e => setForm({ ...form, password: e })} />

            <Button text='Log in' handlePress={submit} buttonStyle='h-[60px] mt-6' isLoading={isSubmitting} />

            <View className='flex justify-center pt-5 flex-row gap-2'>
              <Text className='text-lg text-foreground font-regular'>Don't have an account?</Text>
              <Link replace href='/sign-up' className='text-lg font-semibold text-foreground'>
                Create one.
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignIn
