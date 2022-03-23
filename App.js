import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, ActivityIndicator, FlatList, Text, View, Button} from 'react-native'
import MapView from 'react-native-maps';
import About from './component/about'
import Localisation from './component/localisation'
import Quizz from './component/quizz'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native-web';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createNativeStackNavigator();

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getQuizz = async () => {
     try {
      const response = await fetch('https://perso-etudiant.u-pem.fr/~sally.niasse/musee-fragonard/api.php');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getQuizz();
  }, []);


//Ce qui est visible
  return (
    
    <View style={styles.container}>
      <View style={styles.navigation}>
          <Text>Musée Fragonard de l'Ecole Nationale Vétérinaire d'Alfort </Text>
      </View>

      <View style={styles.navigation}>
          <Text>Localisation</Text>
          <View style={styles.containerMap}>
    {/*Render our MapView*/}
      <MapView
        style={styles.map}
        //specify our coordinates.
        initialRegion={{
          latitude: 48.812599,
          longitude: 2.422406,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}/>
    </View>
      </View>

      <View style={styles.navigation}>
          <Text>Quizz</Text>
      <View style={{ flex: 1, flexDirection: "row",padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.question}
            <View style={styles.choix}>
            <Button title={item.vraie} onPress={()=>alert(`Bravo ! ${item.commentaires}` )}/>
            <Button title={item.faux} onPress={()=>alert(`Dommage... ${item.commentaires}`)}/>
            </View>
            </Text>
          )}
        />
      )}
      
    </View>

      </View>
      <View style={styles.navigation}>
          <Text>A propos</Text>
      </View>


      {/* <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Accueil" component={About}/>
        <Stack.Screen name="Quizz" component={Quizz}/>
      </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  navigation:{
    // backgroundColor: '#3d314a',
    height:'20%',
    width: '100%',
    justifyContent: 'center',
    fontSize: 15,
  },
  choix: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  map: {
    width:"50%",
    height:"50%",
  },
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },

});
