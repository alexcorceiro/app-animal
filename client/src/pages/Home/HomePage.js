import React , {useState, useEffect}from 'react';
import { StyleSheet, View, Text, Image, Dimensions, Button, TouchableOpacity} from 'react-native';
import {Card } from 'react-native-paper';
import Carousel, { PaginationLight } from 'react-native-x-carousel';
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get('window');

const DATA = [
  {
    coverImageUri: 'https://images.ctfassets.net/b85ozb2q358o/1dfc0a17ab274a83c732b2a8166eca9123331464c64cc77a350ef3c6974a3c0d/b5a2766ea4d404372ebc4558dc42bd07/quelle-est-la-duree-de-vie-d-une-perruche-7.jpg',
    cornerLabelColor: '#007FFF',
    cornerLabelText: 'Max',
  },
  {
    coverImageUri: 'https://i59.servimg.com/u/f59/11/69/02/48/male_p10.jpg',
    cornerLabelColor: '#FF1CAE',
    cornerLabelText: 'mercure',
  },
  {
    coverImageUri: 'https://www.laliberte.ch/media/image/11/normal/07_fr_perroquets.jpg',
    cornerLabelColor: '#FF1CAE',
    cornerLabelText: 'bella',
  },
  {
    coverImageUri: 'https://i.skyrock.net/5106/80615106/pics/photo_80615106_1.jpg',
    cornerLabelColor: '#007FFF',
    cornerLabelText: 'rock',
  },
];

function HomePage({ navigation }) {

  const [events, setEvents] = useState([]);
  const [AnimalCount, setAnimalCount] = useState(0);
  const [totalBabies, setTotalBabies] = useState(0);
  const [total, setTotal] = useState(0);
  const [PairCount, setPairCount ] = useState(0)


  const renderItem = data => (
    <View
      key={data.coverImageUri}
      style={styles.cardContainer}
    >
      <View
        style={styles.cardWrapper}
      >
        <Image
          style={styles.card}
          source={{ uri: data.coverImageUri }}
        />
        <View
          style={[
            styles.cornerLabel,
            { backgroundColor: data.cornerLabelColor },
          ]}
        >
          <Text style={styles.cornerLabelText}>
            { data.cornerLabelText }
          </Text>
        </View>
      </View>
    </View>
  );



  useEffect(async () => {
    const token = await AsyncStorage.getItem("token")
      axios.get('http://localhost:7000/animal', { headers: { Authorization: `Bearer ${token}`}})
          .then(response => {
              setAnimalCount(response.data.length);
         
          })
          .catch(error => {
              console.error(error);
     
          });
  }, []);

  
  useEffect(() => {
    const getAllBirths = async () => {
        try {
             const token = await AsyncStorage.getItem("token")
            const response = await axios.get('http://localhost:7000/birth', { headers: { Authorization: `Bearer ${token}`}}); // replace with your API endpoint
            const births = response.data;

            let total = 0;
            births.forEach(birth => {
                total += birth.number_babies;
            });
            
            setTotalBabies(total);
        } catch (err) {
            console.error('Failed to fetch births:', err);
        }
    };

    getAllBirths();
}, []);

useEffect(() => {
  const getAllBirths = async () => {
      try {
           const token = await AsyncStorage.getItem("token")
          const response = await axios.get('http://localhost:7000/pair', { headers: { Authorization: `Bearer ${token}`}})// replace with your API endpoin
              .then(response => {
                setPairCount(response.data.length);
             
              })
              .catch(error => {
                  console.error(error);
         
              });
      } catch (err) {
          console.error('Failed to fetch births:', err);
      }
  };

  getAllBirths();
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token")
        const response = await axios.get('http://localhost:7000/stock', { headers: { Authorization: `Bearer ${token}`}});
        const stocks = response.data;
        let totalQuantity = 0;
        for (let stock of stocks) {
          totalQuantity += Number(stock.quantity);
        }
        setTotal(totalQuantity);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  
  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get('http://localhost:7000/event', { headers: { Authorization: `Bearer ${token}`}});
    
    let eventsData = response.data;
    // Sort events by date in ascending order
    eventsData.sort((a, b) => new Date(a.date) - new Date(b.date));
    setEvents(eventsData);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title="Acceuil" isHome={true} navigation={navigation} />
      <View>
        <View style={styles.container}>
          <Carousel
            pagination={PaginationLight}
            renderItem={renderItem}
            data={DATA}
            loop
            autoplay
          />
        </View>
        <View style={styles.body}>
          <TouchableOpacity style={styles.countCard} onPress={() => navigation.navigate("AnimalList")}>
            <Text style={styles.countText}>{`Animaux : ${AnimalCount}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.countCard} onPress={() => navigation.navigate("PairList")}>
            <Text style={styles.countText}>{`Couples : ${PairCount}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.countCard} onPress={() => navigation.navigate("StockList")}>
            <Text style={styles.countText}>{`Quantité de nourriture en stock : ${total} kg` }</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.countCard} onPress={() => navigation.navigate("BirthList")}>
            <Text style={styles.countText}>{`Nombre de naissances : ${totalBabies}`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          {events.filter((event, idx) => idx < 1).map((event) => (
            <Card key={event.id} style={styles.cardevent}>
              <Card.Title title={event.title} subtitle={event.date} />
              <Card.Content>
                <Text>{event.description}</Text>
                <View style={styles.btncard}>
                  <Button 
                    title="Details"
                    onPress={() => navigation.navigate('DetailEvent', { id: event.id })}
                  />
                </View> 
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 12,
    marginTop: 30,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    maxHeight: 300,

  },
  cardWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    height: width * 0.5, 
  },
  card: {
    width: width * 0.9,
    height: width * 0.5,
  },
  cornerLabel: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  countCard: {
    width: '45%', 
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, 
  },
  countText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  bottom: {
    display: "flex",
    alignItems: "center", 
    justifyContent: 'center'
  },
  cardevent : {
    margin: 6
  },
  btncard : {
    width: "28%", 
    marginLeft: "70%",
    marginTop: "10%",
    borderRadius: 14
  }
});


export default HomePage;







