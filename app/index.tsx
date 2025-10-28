import { StyleSheet, View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
// import DisplayDate from '@/components/DisplayDate';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* <DisplayDate date={new Date()} /> */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});