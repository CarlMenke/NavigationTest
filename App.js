import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { BottomTabs } from './Navigation';
import { navigationRef } from './RootNavigation';

export default function App() {
  return (
    <NavigationContainer ref={navigationRef} >
      <View style={styles.container}>
        <BottomTabs/>
      </View>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
