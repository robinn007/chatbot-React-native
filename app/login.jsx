import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginPageScreen = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added for loading state


  const handleChange = (name, value) => {
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const { email, password } = loginInfo;

    // Validation
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Email and password are required",
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
      });
      setIsLoading(false);
      return;
    }

    try {
      const url = `https://full-stack-loginapi.vercel.app/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: message,
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          onShow: () => {},
          onHide: () => {},
        });
        // Store token and user name in AsyncStorage
        await AsyncStorage.setItem("token", jwtToken);
        await AsyncStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          router.push("/chathome");
        }, 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message || "An error occurred";
        Toast.show({
          type: "error",
          text1: "Error",
          text2: details,
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          onShow: () => {},
          onHide: () => {},
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: message,
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          onShow: () => {},
          onHide: () => {},
        });
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err.message || "Something went wrong",
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center px-6 pt-24 pb-8">
          <TouchableOpacity className="mr-4">
            <Link href="/">
              <Ionicons name="chevron-back" size={24} color="#374151" />
            </Link>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View className="px-6">
          <Text className="text-3xl font-bold text-gray-800 mb-8">
            Hey,{"\n"}Welcome{"\n"}Back
          </Text>

          {/* Form */}
          <View className="mb-8">
            {/* Email Input */}
            <View className="mb-6">
              <View className="flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-100">
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#9CA3AF"
                  className="mr-3"
                />
                <TextInput
                  placeholder="Enter your email"
                  value={loginInfo.email}
                  onChangeText={(text) => handleChange("email", text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 text-gray-700 text-base ml-3"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-2">
              <View className="flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-100">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#9CA3AF"
                  className="mr-3"
                />
                <TextInput
                  placeholder="Enter your password"
                  value={loginInfo.password}
                  onChangeText={(text) => handleChange("password", text)}
                  secureTextEntry={!showPassword}
                  className="flex-1 text-gray-700 text-base ml-3"
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password Link */}
            <View className="flex-row justify-end mb-2">
              <TouchableOpacity>
                <Text className="text-gray-800 font-medium text-sm">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className={`bg-gray-800 rounded-2xl py-4 mb-6 ${isLoading ? "opacity-50" : ""}`}
          >
            <Text className="text-white text-center font-semibold text-base">
              {isLoading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500 text-sm">or continue with</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Google Login Button */}
          <TouchableOpacity className="bg-white rounded-2xl py-4 mb-6 shadow-sm border border-gray-100">
            <View className="flex-row items-center justify-center">
              {/* <Text className="text-gray-700 font-semibold text-base">
                Google
              </Text> */}
              <Image
                source={require("../assets/images/google2.png")}
                className="h-5 w-5 mr-3"
              />
              <Text className="text-gray-700 font-semibold text-base">
                Google
              </Text>
            </View>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View className="flex-row justify-center mb-8">
            <Text className="text-gray-500 text-sm">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity>
              <Link
                href="/signup"
                className="text-gray-800 font-semibold text-sm"
              >
                Sign up
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default LoginPageScreen;




// import {
//   GoogleSignin,
//   User,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//    webClientId: '138312774095-13l60vvvuj8j3so89th45tg39qeug6lb.apps.googleusercontent.com'
// });

 // const [userInfo, setUserInfo] = useState(null);

  // const handleGoogleSignIn = async() => {
  //   try {
  //   await GoogleSignin.hasPlayServices();
  //   const response = await GoogleSignin.signIn();
  //   if (isSuccessResponse(response)) {
  //     setUserData({ userInfo: response.data });
  //   } else {
  //     // sign in was cancelled by user
  //   }
  // } catch (error) {
  //     console.error("Sign-In Error:", error);
  //   }
  // }