import { StyleSheet, Text, View } from 'react-native';

import Home from './src/Screens/Home';
export default function App() {
  
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent : 'center'
  },
});
