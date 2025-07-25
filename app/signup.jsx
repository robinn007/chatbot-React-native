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
//import AntDesign from "@expo/vector-icons/AntDesign";
import { useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const SignupScreen = () => {
      const { startSSOFlow } = useSSO();
    const router = useRouter();

  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (name, value) => {
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    const { name, email, password, confirmPassword } = signupInfo;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Name, email, password, and confirm password are required",
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Passwords do not match",
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
      });
      return;
    }

    try {
      const url = `https://full-stack-loginapi.vercel.app/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json();
      const { success, message, error } = result;

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
        setTimeout(() => {
          router.push("/login");
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
    }
  };

   const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/chathome");
      }
    } catch (error) {
      console.error("OAuth error:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center px-6 pt-20 pb-8">
          <TouchableOpacity className="mr-4">
            <Link href="/">
              <Ionicons name="chevron-back" size={24} color="#374151" />
            </Link>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View className="px-6">
          <Text className="text-3xl font-bold text-gray-800 mt-2 mb-5">
            Let's get started
          </Text>

          {/* Form */}
          <View className="mb-8">
            {/* Name Input */}
            <View className="mb-6">
              <View className="flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-100">
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#9CA3AF"
                  className="mr-3"
                />
                <TextInput
                  placeholder="Enter your name"
                  value={signupInfo.name}
                  onChangeText={(text) => handleChange("name", text)}
                  autoCapitalize="words"
                  className="flex-1 text-gray-700 text-base ml-3"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

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
                  value={signupInfo.email}
                  onChangeText={(text) => handleChange("email", text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 text-gray-700 text-base ml-3"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <View className="flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-100">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#9CA3AF"
                  className="mr-3"
                />
                <TextInput
                  placeholder="Enter your password"
                  value={signupInfo.password}
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

            {/* Confirm Password Input */}
            <View className="mb-8">
              <View className="flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-100">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#9CA3AF"
                  className="mr-3"
                />
                <TextInput
                  placeholder="Confirm your password"
                  value={signupInfo.confirmPassword}
                  onChangeText={(text) => handleChange("confirmPassword", text)}
                  secureTextEntry={!showConfirmPassword}
                  className="flex-1 text-gray-700 text-base ml-3"
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignup}
            className="bg-gray-800 rounded-2xl py-4 mb-6"
          >
            <Text className="text-white text-center font-semibold text-base">
              Sign up
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500 text-sm">or continue with</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Google Sign Up Button */}
          <TouchableOpacity className="bg-white rounded-2xl py-4 mb-6 shadow-sm border border-gray-100" onPress={handleGoogleSignIn}>
            <View className="flex-row items-center justify-center">
              {/* <Text className="text-gray-700 font-semibold text-base ">
                <AntDesign name="google" size={24} color="black" className="" />
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

          {/* Login Link */}
          <View className="flex-row justify-center mb-8">
            <Text className="text-gray-500 text-sm">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity>
              <Link
                href="/login"
                className="text-gray-800 font-semibold text-sm"
              >
                Login
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default SignupScreen;
