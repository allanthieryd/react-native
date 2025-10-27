import { StyleSheet, Text, ScrollView } from 'react-native';
import DisplayDate from '@/components/DisplayDate';
import FichePerso from '@/components/FichePerso';
import getPersons from '@/service/PersonnageService';

export default function Tab1Screen() {
  const personnages = getPersons();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <DisplayDate date={new Date()} />
      {personnages.map((p, i) => (
        <FichePerso {...p} key={i} />
      ))}
      <Text style={styles.text}>Contenu du Tab 1</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 50,
    marginBottom: 50,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
  },
});