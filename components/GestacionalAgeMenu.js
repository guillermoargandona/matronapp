import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

const GestacionalAgeMenu = (props) => {
  return (
    <View style={styles.navContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Edad Gestacional</Text>
      </View>
      {props.method === props.FUR ? (
        <View style={styles.subtitleContainer}>
          <TouchableWithoutFeedback onPress={props.changeMethodFUR}>
            <View style={{ flex: 1 }}>
              <Text style={styles.subtitleTextSelected}>FUR</Text>
              <Text style={{ height: 6, backgroundColor: "#FCD3C8" }}>c</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={props.changeMethodFUROPERACIONAL}>
            <Text style={styles.subtitleText}>FUR Operacional</Text>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <View style={styles.subtitleContainer}>
          <TouchableWithoutFeedback onPress={props.changeMethodFUR}>
            <Text style={styles.subtitleText}>FUR</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={props.changeMethodFUROPERACIONAL}>
            <View style={{ flex: 1 }}>
              <Text style={styles.subtitleTextSelected}>FUR Operacional</Text>
              <Text style={{ height: 6, backgroundColor: "#FCD3C8" }}>c</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: "#534658",
    width: "100%",
    flex: 20,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
  },
  titleText: {
    color: "white",
    fontSize: 24,
  },
  subtitleContainer: {
    flexDirection: "row",
    flex: 1,
  },
  subtitleTextSelected: {
    alignSelf: "center",
    color: "white",
    fontSize: 18,
    flex: 1,
    textAlign: "center",
  },
  subtitleText: {
    color: "white",
    fontSize: 18,
    flex: 1,
    textAlign: "center",
    opacity: 0.8,
  },
});

export default GestacionalAgeMenu;
