import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { formatDate } from "../services/DateFormat";

const InputDatesContainer = (props) => {
  const icon = <FontAwesome5 name={"calendar"} size={16} />;

  return (
    <React.Fragment>
      {props.method === props.FUR ? (
        <TouchableWithoutFeedback onPress={props.showFurDatepicker}>
          <View style={styles.containerInputText}>
            <Text styles={styles.titleInputText}>FUR</Text>
            <View flexDirection="row">
              <View flex={9}>
                {props.furDate ? (
                  <Text style={styles.inputText}>
                    {formatDate(props.furDate)}
                  </Text>
                ) : (
                  <Text style={styles.placeholderInput}>Ingrese fecha</Text>
                )}
              </View>
              <View flex={1}>
                <Text style={styles.inputTextIcon}>{icon}</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : null}

      {props.method === props.FUR_OPERACIONAL ? (
        <React.Fragment>
          <TouchableWithoutFeedback onPress={props.showEcoDatepicker}>
            <View style={styles.containerInputText}>
              <Text styles={styles.titleInputText}>Fecha Ecografía</Text>
              <View flexDirection="row">
                <View flex={9}>
                  {props.ecoDate ? (
                    <Text style={styles.inputText}>
                      {formatDate(props.ecoDate)}
                    </Text>
                  ) : (
                    <Text style={styles.placeholderInput}>Ingrese fecha</Text>
                  )}
                </View>
                <View flex={1}>
                  <Text style={styles.inputTextIcon}>{icon}</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              width: "80%",
              marginTop: 20,
            }}
          >
            <View flex={1}>
              <Text styles={styles.titleInputText}>Semanas</Text>
              <TextInput
                style={styles.inputText}
                onChangeText={(text) => props.setEcoWeeks(text)}
                keyboardType="numeric"
                placeholder="N° semanas"
                placeholderTextColor="#9B9B9B"
              ></TextInput>
            </View>
            <View flex={1}>
              <Text styles={styles.titleInputText}>Dias</Text>
              <TextInput
                ref={this.ecoDaysInput}
                style={styles.inputText}
                onChangeText={(text) => props.setEcoDays(text)}
                keyboardType="numeric"
                placeholder="N° días"
                placeholderTextColor="#9B9B9B"
              ></TextInput>
            </View>
          </View>
        </React.Fragment>
      ) : null}

      <TouchableWithoutFeedback onPress={props.showPickDatepicker}>
        <View style={styles.containerInputText}>
          <Text styles={styles.titleInputText}>Fecha</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 9 }}>
              <Text style={styles.inputText}>{formatDate(props.pickDate)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputTextIcon}>{icon}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {props.show && (
        <DateTimePicker
          testID="dateTimePickerFurDate"
          value={props.value}
          mode={props.mode}
          is24Hour={true}
          display="default"
          onChange={props.onChange}
          style={{ backgroundColor: "red" }}
        />
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  containerInputText: {
    borderBottomColor: "#f0cfc8",
    borderBottomWidth: 2,
    width: "80%",
    height: 55,
    marginTop: 15,
  },
  titleInputText: {
    marginTop: 20,
    marginBottom: 0,
  },
  inputText: {
    fontSize: 20,
    marginLeft: 5,
  },
  inputTextIcon: {
    marginTop: 6,
    marginLeft: 5,
    color: "#9B9B9B",
  },
  placeholderInput: {
    fontSize: 20,
    color: "#9B9B9B",
    marginLeft: 5,
  },
});

export default InputDatesContainer;
