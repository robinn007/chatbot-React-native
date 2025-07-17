import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, SafeAreaView, Image } from 'react-native';

const WelcomeScreen = () => {
  const [activeButton, setActiveButton] = useState('login');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <View className="flex-row items-center justify-center pt-32 pb-4">
        <View className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3">
          <View className="w-4 h-4 bg-white rounded-sm transform rotate-45" />
        </View>
        <Text className="text-xl font-semibold text-gray-800">Chatbot</Text>
      </View>

      {/* Main Content Container - Better Centering */}
      <View className="flex-1 justify-center items-center px-8">
        
        {/* Image */}
        <View className="mb-8">
          <Image
            source={require('../assets/images/cover.png')}
            className="w-72 h-80"
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text className="text-3xl font-bold text-gray-800 text-center mb-3">
          Lorem ipsum{'\n'}dolor.
        </Text>

        {/* Subtitle */}
        <Text className="text-gray-500 text-center mb-10 leading-6 px-2 text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        </Text>

        {/* Buttons Container */}
        <View className="w-full max-w-xs">
          <View className="flex-row bg-white rounded-full p-1 shadow-sm">
            {/* Login Button */}
            <Link href="./login" asChild>
              <TouchableOpacity 
                className={`flex-1 rounded-full py-3.5 px-4 ${
                  activeButton === 'login' 
                    ? 'bg-gray-800' 
                    : 'bg-white'
                }`}
                onPress={() => setActiveButton('login')}
              >
                <Text className={`text-center font-semibold text-base ${
                  activeButton === 'login' 
                    ? 'text-white' 
                    : 'text-gray-700'
                }`}>
                  Login
                </Text>
              </TouchableOpacity>
            </Link>
            
            {/* Sign-up Button */}
            <Link href="./signup" asChild>
              <TouchableOpacity 
                className={`flex-1 rounded-full py-3.5 px-4 ${
                  activeButton === 'signup' 
                    ? 'bg-gray-800' 
                    : 'bg-white'
                }`}
                onPress={() => setActiveButton('signup')}
              >
                <Text className={`text-center font-semibold text-base ${
                  activeButton === 'signup' 
                    ? 'text-white' 
                    : 'text-gray-700'
                }`}>
                  Sign-up
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
      
      {/* Bottom Spacer */}
      <View className="h-8" />
    </SafeAreaView>
  );
};

export default WelcomeScreen;




//../assets/images/cover.png