
import React, { useEffect, useState } from 'react';
import {StyleSheet, ScrollView, ActivityIndicator, FlatList, Text, View, Button, Image, Linking, StatusBar} from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  //Function de localisation
  const region = {
    latitude: 48.812599,
    longitude: 2.422406,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

 //API Quizz
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


//Ce qui est visible sur l'appli
  return (
    <ScrollView  style={styles.scrollView} 
    contentContainerStyle={styles.contentContainer}>

    <SafeAreaView>

{/* Fonctionnalité A propos */}
      <View style={styles.propos}>
          <Text style={styles.titre}>Musée Fragonard de l'Ecole Nationale Vétérinaire d'Alfort </Text>
          
          <Image
          style={{ flex:1, width:"100%", marginBottom:"5%"}}
          source={require('./img/landing.jpg')}/>
          <Text>Le musée Fragonard est un des plus anciens musées de France. Il a été créé en 1766, en même temps que l'École royale vétérinaire de Paris.</Text>
          <Text>Le Centre hospitalier universitaire vétérinaire d'Alfort pour les animaux de compagnie est un établissement de soins pour votre compagnon (chien, chat ou nouvel animal de compagnie), il est parallèlement investi d'une mission d'enseignement auprès des futurs vétérinaires, élèves de l'EnvA</Text>
        </View>
        <View style={{borderBottomColor: '#96705B',borderBottomWidth: 5, textAlign:"center"}}/>
{/* Fonctionnalité Localisation */}
      <View style={styles.localisation}>
          <Text style={styles.titre}>Localisation</Text>
          {/* <View style={styles.containerMap}> */}
          
          <MapView
            style={styles.map}
            initialRegion={region}>
        
              <MapView.Marker
                coordinate={{
                  latitude: 48.812599,
                  longitude: 2.422406,
                }}
                
              />
          </MapView>
    {/* </View> */}
      </View>
      <View style={{borderBottomColor: '#96705B',borderBottomWidth: 5, textAlign:"center"}}/>
{/* Fonctionnalité quizz */}
      <View style={styles.quizz}>
          <Text style={styles.titre}>Quizz</Text>
      <View style={{ flex: 1, flexDirection: "row",padding: 12 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View>
            <Text>{item.question}</Text>
            <Button color="#684756" title={item.vraie} onPress={()=>alert(`Bravo ! ${item.commentaires}` )}/>
            <Text style={{ textAlign:"center" }}> Ou bien</Text>
            <Button color="#684756" title={item.faux} onPress={()=>alert(`Dommage... ${item.commentaires}`)}/>
            </View>
            
          )}
        />
      )}
      
    </View>
      </View>
      <View style={{borderBottomColor: '#96705B',borderBottomWidth: 5, textAlign:"center"}}/>
      {/* Fonctionnalité réseaux */}
      <View style={styles.partage}>
      <Text style={styles.titre}>Nos réseaux </Text> 
      <Text>Partager ce que vous avez appris et suivez nous sur nos réseaux sociaux ci-dessous</Text>
          <View>
            <Text style={styles.lien} onPress={() => Linking.openURL('https://www.facebook.com/EnvAlfort')}>
              Facebook
              <Image style={styles.tinyLogo} source={require('./img/facebook.png')} />
            </Text>
            <Text style={styles.lien} onPress={() => Linking.openURL('https://www.linkedin.com/school/ecole-nationale-veterinaire-dalfort/')}>
              Linkedin
              <Image style={styles.tinyLogo} source={require('./img/linkedin.png')} />
            </Text>
            <Text style={styles.lien} onPress={() => Linking.openURL('https://www.instagram.com/ecoleveterinairealfort/?hl=fr')}>
              Instagram
              <Image style={styles.tinyLogo} source={require('./img/instagram.png')} />
            </Text>
            <Text style={styles.lien} onPress={() => Linking.openURL('https://www.youtube.com/channel/UC611Wz1LhCujdyupGTr4GnQ?view_as=subscriber')}>
              Youtube
              <Image style={styles.tinyLogo} source={require('./img/youtube.png')} />
            </Text>
            <Text style={styles.lien} onPress={() => Linking.openURL('https://twitter.com/Env_Alfort?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor')}>
              Twitter
              <Image style={styles.tinyLogo} source={require('./img/twitter.png')} />
            </Text>
          </View>
      </View>
    </SafeAreaView>
    </ScrollView>

  );
}
// Le style de l'application
const styles = StyleSheet.create({
  /*Mise en place du Scroll et du conteneur principal*/
  scrollView: {
    width: '100%',
    marginTop: 20,
    alignSelf: 'center',
    padding: 5,
    backgroundColor: '#AB8476'
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AB8476',
    paddingTop: 20,
    width: "100%",
  },
  /*Général*/
  titre:{
    fontWeight: "bold",
    fontSize: 20,
    color: "#3D314A",
  },
  lien:{
    padding:5,
    justifyContent: 'center',
    textAlign: "center",
    fontSize: 15,
  },
  tinyLogo: {
    width:50,
    height: 50,
  },
/* Les sections*/
  propos:{
    height: "50%",
    fontSize: 15,
    paddingBottom: 250,

  },
  localisation:{
    paddingTop: 20,
    paddingBottom: 30,
    
    height:'100%',
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    width:"100%",
    height:"100%",

    padding: 100,
  },
  MapView: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  
  quizz:{
    paddingTop: 0,
    height:'15%',

  },
  partage:{
    paddingBottom: 10,
    flex: 1,
    justifyContent: 'center',
    textAlign: "justify",
  },

 

});

