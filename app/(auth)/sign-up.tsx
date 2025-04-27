import React, { useState } from 'react'
import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { images } from '~/constants'
import { useAuth } from '~/providers/AuthProvider'
import { Button, FormField, Checkbox } from '~/components/Common'

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    formError: '',
    joinMailing: true,
  })
  const { signin, signup } = useAuth()

  const navigateTo = (href: string) => {
    while (router.canGoBack()) router.back()
    router.replace(href)
  }

  const submit = async () => {
    // Form validation
    if (form.email === '' || form.password === '') {
      setForm({ ...form, formError: 'Please fill in all fields' })
      return
    }

    // Start Sign up process
    setSubmitting(true)

    const signupRes = await signup({ email: form.email, password: form.password, joinMailList: form.joinMailing })
    // Sign up failed
    if (!signupRes.success) {
      if (signupRes.field === 'email') {
        setForm({ ...form, emailError: signupRes.error ?? '' })
      } else {
        setForm({ ...form, formError: signupRes.error ?? '' })
      }
    } else {
      // Sign up success, sign in directly
      const signinRes = await signin({ user: form.email, password: form.password })
      if (!signinRes.success) {
        setForm({ ...form, formError: signinRes.error ?? '' })
      } else {
        if (!signinRes.loggedIn?.emailVerified) navigateTo('/verify-email')
        else if (!signinRes.loggedIn?.valid) navigateTo('/acct-setup')
        else navigateTo('/home')
      }
    }

    setSubmitting(false)
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView className='h-full' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View className='w-full h-full flex justify-center px-6 my-6'>
            <View className='items-center'>
              <Image source={images.logo} resizeMode='contain' className='w-[80%] h-[70px] mb-6' />
              {form.formError && <Text className='absolute bottom-0 text-red-400 text-base font-regular'>{form.formError}</Text>}
            </View>

            <FormField
              title='Email'
              value={form.email}
              handleChangeText={text => setForm({ ...form, email: text })}
              keyboardType='email-address'
              error={form.emailError}
            />
            <FormField title='Password' value={form.password} handleChangeText={e => setForm({ ...form, password: e })} error={form.passwordError} />

            <Checkbox
              text='I agree to join the mailing list'
              checked={form.joinMailing}
              onPress={() => {
                setForm({ ...form, joinMailing: !form.joinMailing })
              }}
              otherStyles='mt-4 ml-5'
            />

            <Button text='Create account' handlePress={submit} buttonStyle='h-[60px] mt-6' isLoading={isSubmitting} />

            <View className='flex justify-center pt-5 flex-row gap-2'>
              <Text className='text-lg text-foreground font-regular'>Already have an account?</Text>
              <Link replace href='/sign-in' className='text-lg font-semibold text-foreground'>
                Log in
              </Link>
            </View>
            <Text className='text-md text-gray-400 font-regular px-4 mt-8'>
              By continuing the registration, you agree to our Terms of Service and Privacy Policy.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUp
