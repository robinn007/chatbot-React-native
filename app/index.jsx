import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'

const index = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      // delay to ensure Root Layout is fully mounted
      const timer = setTimeout(() => {
        router.replace('/welcomepage');
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  return (
    <View className="flex-1 justify-center items-center bg-gray-50">
      <Text className="text-lg text-gray-600">Loading...</Text>
    </View>
  )
}

export default index;