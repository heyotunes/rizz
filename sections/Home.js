import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";

const url = "https://pickuplineapiapp.herokuapp.com/apiData/lines";

const Homescreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    caveatbold: require("../assets/fonts/Caveat-Bold.ttf"),
    caveatmedium: require("../assets/fonts/Caveat-Medium.ttf"),
    caveatregular: require("../assets/fonts/Caveat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  //useEffect(
  //() =>
  //onSnapshot(doc(db, "Users", auth.currentUser.uid), (snapshot) => {
  //if (!snapshot.exists()) {
  //  navigation.navigate("Account");
  //}
  //}),
  //[]
  //);

  const excuse = () => {
    fetch(url)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json);
        setIsLoading(false);
        console.log(json);
      })
      .catch((error) => alert(error)); // display errors
    setIsLoading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Textcontainer}>
        <Text style={styles.logotext}>ASK</Text>
        <Text style={styles.logotext}>RIZZ GOD!</Text>
      </View>

      <View>
        <View style={styles.rizcontainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <Text style={styles.movieText}>{data.line}</Text>
          )}
        </View>

        <TouchableOpacity onPress={excuse} style={styles.btn}>
          <Text
            style={{
              textAlign: "center",
              paddingTop: 16,
              fontSize: 20,
              color: "white",
              fontWeight: "500",
            }}
          >
            Get Rizzz
          </Text>
        </TouchableOpacity>
        <View style={styles.guidecontainer}>
          <Text style={styles.guidetext}>
            Use this button to generate random rizz for your crush
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0F0F0F",
  },
  Textcontainer: {
    marginTop: 50,
    marginRight: 0,
  },
  logotext: {
    fontSize: 50,
    color: "#F56B1D",
    fontWeight: "bold",
    fontFamily: "caveatbold",
    textAlign: "center",
  },

  movieText: {
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  btn: {
    height: 60,
    width: 300,
    borderRadius: 20,
    backgroundColor: "#F56B1D",
    marginBottom: 30,
    marginTop: 30,
  },
  photo: {
    height: 80,
    marginTop: -150,
  },
  photocontainer: {
    marginTop: 220,
  },
  guidecontainer: {
    justifyContent: "center",
    width: 190,
    marginLeft: 60,
  },
  guidetext: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
  rizcontainer: {
    marginTop: 20,
    marginBottom: 20,
    height: 200,
    width: 300,
    borderColor: "#F56B1D",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
  },
});

export default Homescreen;
