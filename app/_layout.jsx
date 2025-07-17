// import { Stack } from "expo-router";
// import "./globals.css"

// export default function RootLayout() {
//   return <Stack />;
// }

import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
     <StatusBar hidden={true} />
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="welcomepage" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="chathome" options={{ headerShown: false }} />
    </Stack>
    </>
  );
}



// import { Stack, router } from "expo-router";
// import { useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const ProtectedRoute = ({ children }) => {
//   useEffect(() => {
//     const checkAuth = async () => {
//       const userInfo = await AsyncStorage.getItem("user-info");
//       if (!userInfo) {
//         router.replace("/login");
//       }
//     };
//     checkAuth();
//   }, []);

//   return children;
// };

// export default function RootLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//       <Stack.Screen name="login" options={{ headerShown: false }} />
//       <Stack.Screen name="signup" options={{ headerShown: false }} />
//       <Stack.Screen name="onboarding" options={{ headerShown: false }} />
//       <Stack.Screen
//         name="dashboard"
//         options={{ headerShown: false }}
//         getComponent={() =>
//           require("./dashboard").default // Adjust path to your Dashboard component
//         }
//         component={() => (
//           <ProtectedRoute>
//             <require("./dashboard").default />
//           </ProtectedRoute>
//         )}
//       />
//     </Stack>
//   );
// }