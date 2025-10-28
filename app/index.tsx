import { StyleSheet, View, Text, Button, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={require('@/assets/images/unnamed.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Page d&apos;accueil</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Aller à la page 1"
            onPress={() => router.push('/infos/tab1')}
          />
          <Button
            title="Aller à la page 2"
            onPress={() => router.push('/infos/tab2')}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    opacity: 0.6, // Ajustez selon votre image
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    color: '#544e4eff', // Ajustez selon votre image
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});