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
      <View style={styles.propos}>
          <Text>Musée Fragonard de l'Ecole Nationale Vétérinaire d'Alfort </Text>
      </View>

      <View style={styles.localisation}>
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

      <View style={styles.quizz}>
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
      <View style={styles.reseau}>
          <Text>Partager ce que vous avez appris </Text>
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
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  propos:{
    height:'30%',
    width: '100%',
    justifyContent: 'center',
    textAlign: "justify",
    fontSize: 15,
  },
  quizz:{
    height:'30%',
    width: '100%',
    justifyContent: 'center',
    fontSize: 15,
  },
  localisation:{
    height:'30%',
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
    width:"100%",
    height:"75%",
  },
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  item:{
    height:"50px",
  }

});
