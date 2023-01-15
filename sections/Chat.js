import React, { useState, useEffect } from "react";

import { OPENAI_API_KEYS } from "@env";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { ActivityIndicator } from "react-native";

const Chatscreen = () => {
  const [response, setResponse] = useState(null);
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const callAi = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEYS}`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: body,
          temperature: 0.5,
          max_tokens: 60,
          top_p: 1.0,
          frequency_penalty: 0.5,
          presence_penalty: 0.0,
          stop: ["You:"],
        }),
      });
      const json = await res.json();
      setResponse(json);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  console.log(response);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <KeyboardAvoidingView
          behavior={"height"}
          keyboardVerticalOffset={10}
          style={styles.container}
        >
          <View style={styles.moveTextcontainer}>
            <Text style={styles.moveText}>
              Texting your crush and dont know what to say next? Type in the
              conversation below and RIZZGOD will return with a suitable
              response that will fit-in the conversation
            </Text>
          </View>

          <View style={styles.respbox}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            ) : (
              response && (
                <Text style={styles.respboxtext}>
                  {JSON.stringify(response.choices[0].text.slice(1, -1))}
                </Text>
              )
            )}
          </View>

          <View style={styles.view1}>
            <TextInput
              placeholder="Send Message..."
              onChangeText={setBody}
              value={body}
              style={styles.input1}
            />

            <Button
              onPress={callAi}
              title="Send"
              color="#F56B1D"
              style={styles.btn1}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },
  key1: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  moveText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: "#F56B1D",
  },

  moveTextcontainer: {
    textAlign: "center",
    justifyContent: "center",
    width: 350,
    marginTop: 20,
  },

  respboxcontainer: {
    width: 400,
    height: 450,
    borderRadius: 0,
    backgroundColor: "black",
    borderWidth: 5,
    borderColor: "#F07048",
    marginTop: 30,
    marginBottom: 30,
  },
  respbox: {
    marginTop: 70,
    marginBottom: 40,
    marginLeft: 20,
    width: 300,
    borderBottomRightRadius: 20,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#F56B1D",
    color: "white",
  },
  respboxtext: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 20,
    color: "white",
  },
  respbox1: {
    marginTop: 40,
    marginLeft: 70,
    width: 300,
    borderBottomLeftRadius: 20,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#CBC9C9",
    color: "white",
  },
  respboxtext1: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 20,
    color: "white",
  },

  input1: {
    height: 60,
    fontSize: 20,
    width: 330,
    paddingLeft: 20,
    backgroundColor: "white",
    color: "black",
    borderBottomWidth: 1,
    borderColor: "#F07048",
    borderRadius: 8,
  },
  btn1: {
    fontSize: 35,
    height: 60,
    color: "white",
    marginRight: 5,
    backgroundColor: "white",
  },
  view1: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopWidth: 0,
    borderColor: "gray",
    paddingRight: 5,
    paddingTop: 0,
    paddingBottom: 5,
  },
});

export default Chatscreen;
