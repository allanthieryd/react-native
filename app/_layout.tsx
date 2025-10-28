import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' }
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="infos" 
          options={{ 
            title: 'Home',
            headerShown: true,
            headerTransparent: true,
          }}
        />
      </Stack>
  );
}