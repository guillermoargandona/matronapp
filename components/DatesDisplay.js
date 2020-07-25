import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { formatDate } from "../services/DateFormat";

const datesDisplay = (props) => {
  return (
    <React.Fragment>
      {props.method === props.FUR_OPERACIONAL ? (
        <View style={{ flexDirection: "row" }}>
          <View style={styles.dateWrapper}>
            <Text style={styles.inputText}>
              {formatDate(props.furOperacionalDate)}
            </Text>
            <Text style={styles.dateColor}>FUR Operacional</Text>
          </View>
        </View>
      ) : null}

      <View style={styles.dateContainer}>
        <View style={styles.dateWrapper}>
          <Text style={styles.inputText}>{props.gestacionalAge}</Text>
          <Text style={styles.dateColor}>Edad Gestacional</Text>
        </View>
      </View>

      <View style={styles.dateContainer}>
        <View style={styles.dateWrapper}>
          <Text style={styles.inputText}>{formatDate(props.preNatalDate)}</Text>
          <Text style={styles.dateColor}>Licencia Prenatal</Text>
        </View>
        <View style={styles.dateWrapper}>
          <Text style={styles.inputText}>
            {formatDate(props.fifthMonthDate)}
          </Text>
          <Text style={styles.dateColor}>Quinto Mes</Text>
        </View>
      </View>
      <View style={styles.dateContainer}>
        <View style={styles.dateWrapper}>
          <Text style={styles.inputText}>{formatDate(props.dueDate)}</Text>
          <Text style={styles.dateColor}>Parto</Text>
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    marginTop: 20,
    flexDirection: "row",
  },
  dateWrapper: {
    alignItems: "center",
    flex: 1,
  },
  dateColor: {
    color: "#9B9B9B",
  },
  inputText: {
    fontSize: 20,
    marginLeft: 5,
  },
});

export default datesDisplay;
