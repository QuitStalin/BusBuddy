// app/_layout.js
import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="login"
        options={{ title: "Login", headerShown: false }}
      />

      <Stack.Screen
        name="signup"
        options={{ title: "Sign Up", headerShown: false }}
      />

      <Stack.Screen name="main" options={{ headerShown: false }} />
    </Stack>
  );
}
