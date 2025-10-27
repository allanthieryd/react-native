import { Text, StyleSheet } from 'react-native';

export default function DisplayDate({ date }: { date: Date }) {
  return (
    <Text style={styles.container}>{date.toDateString()}</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    // color: 'white',
  }, 
});