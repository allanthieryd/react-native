import { Stack } from 'expo-router';
import { ImageBackground, StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <ImageBackground 
      source={require('../assets/images/1735502381444.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
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
            title: 'Infos',
            headerShown: true,
            headerTransparent: true,
          }}
        />
      </Stack>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});