import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
import About from './component/about'
import Localisation from './component/localisation'
import Quizz from './component/quizz'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
          <Text>Musée Fragonard de l'Ecole Nationale Vétérinaire d'Alfort </Text>
      </View>
      <View style={styles.navigation}>
          <Text>Localisation</Text>
      </View>
      <View style={styles.navigation}>
          <Text>Quizz</Text>
      </View>
      <View style={styles.navigation}>
          <Text>A propos</Text>
      </View>
      <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name="Accueil" component={About} />
        <Tab.Screen name="Localisation" component={Localisation} />
        <Tab.Screen name="Quizz" component={Quizz} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigation:{
    backgroundColor: '#3d314a',
    height:'20%',
    width: '100%',
    justifyContent: 'center',
    fontSize: 15,

  }
});
