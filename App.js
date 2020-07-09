import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function App() {
  const FUR = "FUR";
  const FUR_OPERACIONAL = "FUR OPERACIONAL";

  const DAYS_TO_DUE_DATE = 280;
  const DAYS_TO_PRE_NATAL = 238;
  const DAYS_TO_FIFTH_MONTH = 126;

  const [method, setMethod] = useState(FUR);

  const [furDate, setFurDate] = useState(false);

  const [ecoDate, setEcoDate] = useState(false);
  const [ecoWeeks, setEcoWeeks] = useState(0);
  const [ecoDays, setEcoDays] = useState(0);

  const [pickDate, setPickDate] = useState(new Date());
  const [gestacionalAge, setGestacionalAge] = useState("--");
  const [dueDate, setDueDate] = useState("--/--/--");
  const [preNatalDate, setPreNatalDate] = useState(false);
  const [fifthMonthDate, setFithMonthDate] = useState(false);

  const [weeks, setWeeks] = useState(0);
  const [days, setDays] = useState(0);

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(false);
  const [modifyDate, setModifyDate] = useState("");

  const icon = <FontAwesome5 name={"calendar"} size={16} />;

  const changeMethodFUR = () => {
    resetDate();
    setMethod(FUR);
  };

  const changeMethodFUROPERACIONAL = () => {
    resetDate();
    setMethod(FUR_OPERACIONAL);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === "ios");
    if (selectedDate) {
      if (modifyDate === "furDate") {
        setFurDate(currentDate);
      } else if (modifyDate === "pickDate") {
        setPickDate(currentDate);
      } else if (modifyDate === "ecoDate") {
        setEcoDate(currentDate);
      }
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showFurDatepicker = () => {
    setValue(furDate || new Date());
    setModifyDate("furDate");
    showMode("date");
  };

  const showEcoDatepicker = () => {
    setValue(ecoDate || new Date());
    setModifyDate("ecoDate");
    showMode("date");
  };

  const showPickDatepicker = () => {
    setValue(pickDate || new Date());
    setModifyDate("pickDate");
    showMode("date");
  };

  function getFurDate() {
    return furDate ? formatDate(furDate) : "--/--/--";
  }

  function getEcoDate() {
    return ecoDate ? formatDate(ecoDate) : "--/--/--";
  }

  const calculateDates = (referenceDate) => {
    if (referenceDate) {
      var newDueDate = new Date(referenceDate);
      var newPrenatalDate = new Date(referenceDate);
      var newFifthMonthDate = new Date(referenceDate);

      newDueDate.setDate(newDueDate.getDate() + DAYS_TO_DUE_DATE);
      newPrenatalDate.setDate(newPrenatalDate.getDate() + DAYS_TO_PRE_NATAL);
      newFifthMonthDate.setDate(
        newFifthMonthDate.getDate() + DAYS_TO_FIFTH_MONTH
      );

      setDueDate(formatDate(newDueDate));
      setPreNatalDate(formatDate(newPrenatalDate));
      setFithMonthDate(formatDate(newFifthMonthDate));
    } else {
      setDueDate("--/--/--");
      setPreNatalDate("--/--/--");
      setFithMonthDate("--/--/--");
    }
  };

  function resetDate() {
    setFurDate(false);
    setEcoDate(false);
    setPickDate(new Date());
    setWeeks(0);
    setDays(0);
    setEcoWeeks(0);
    setEcoDays(0);
    setGestacionalAge("--");
    setDueDate("--/--/--");
    setPreNatalDate("--/--/--");
    setFithMonthDate("--/--/--");
  }

  const calculateFurDate = () => {
    gestationalAgeInWeeks(furDate);
    calculateDates(furDate);
  };

  const calculateFurOperationalDate = () => {
    var furOperacionalDate = false;

    if (ecoDate && !isNaN(ecoWeeks) && !isNaN(ecoDays)) {
      furOperacionalDate = new Date(ecoDate);
      const dias = parseInt(ecoWeeks) * 7 + parseInt(ecoDays);
      furOperacionalDate.setDate(furOperacionalDate.getDate() - dias);
    }

    gestationalAgeInWeeks(furOperacionalDate);
    calculateDates(furOperacionalDate);
  };

  const gestationalAgeInWeeks = (referenceDate) => {
    if (referenceDate) {
      var diffDate = Math.abs(referenceDate - pickDate);
      var diffDays = Math.ceil(diffDate / (1000 * 60 * 60 * 24));

      var numberWeeks = Math.trunc(diffDays / 7);
      var weeksInDays = numberWeeks * 7;

      setWeeks(numberWeeks);
      setDays(diffDays - weeksInDays);

      calculateGestacionalAge(numberWeeks, diffDays - weeksInDays);
    }
  };

  const calculateGestacionalAge = (weeks, days) => {
    var gestacionalDate = "";

    if (weeks !== 0) {
      if (weeks === 1) {
        gestacionalDate += weeks + " Semana ";
      } else {
        gestacionalDate += weeks + " Semanas ";
      }
    }

    if (days !== 0) {
      if (days === 1) {
        gestacionalDate += days + " Día ";
      } else {
        gestacionalDate += days + " Días ";
      }
    }

    if (gestacionalDate) {
      setGestacionalAge(gestacionalDate);
    } else {
      setGestacionalAge("--");
    }
  };

  function formatDate(date) {
    if (date) {
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();

      var pad = "00";
      const monthFormat =
        pad.substring(0, pad.length - month.toString().length) + month;
      const dayFormat =
        pad.substring(0, pad.length - day.toString().length) + day;

      return dayFormat + "/" + monthFormat + "/" + year;
    }

    return "";
  }

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Edad Gestacional</Text>
        </View>
        {method === FUR ? (
          <View style={styles.subtitleContainer}>
            <TouchableWithoutFeedback onPress={changeMethodFUR}>
              <View style={{ flex: 1 }}>
                <Text style={styles.subtitleTextSelected}>FUR</Text>
                <Text style={{ height: 6, backgroundColor: "#FCD3C8" }}>c</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={changeMethodFUROPERACIONAL}>
              <Text style={styles.subtitleText}>FUR Operacional</Text>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <View style={styles.subtitleContainer}>
            <TouchableWithoutFeedback onPress={changeMethodFUR}>
              <Text style={styles.subtitleText}>FUR</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={changeMethodFUROPERACIONAL}>
              <View style={{ flex: 1 }}>
                <Text style={styles.subtitleTextSelected}>FUR Operacional</Text>
                <Text style={{ height: 6, backgroundColor: "#FCD3C8" }}>c</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
      <View
        style={{
          flex: 80,
          width: "100%",
          alignItems: "center",
        }}
      >
        <StatusBar style="light" />

        {method === FUR ? (
          <TouchableWithoutFeedback onPress={showFurDatepicker}>
            <View style={styles.containerInputText}>
              <Text styles={styles.titleInputText}>FUR</Text>
              <View flexDirection="row">
                <View flex={9}>
                  {furDate ? (
                    <Text style={styles.inputText}>{getFurDate()}</Text>
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

        {method === FUR_OPERACIONAL ? (
          <React.Fragment>
            <TouchableWithoutFeedback onPress={showEcoDatepicker}>
              <View style={styles.containerInputText}>
                <Text styles={styles.titleInputText}>Fecha Ecografía</Text>
                <View flexDirection="row">
                  <View flex={9}>
                    {ecoDate ? (
                      <Text style={styles.inputText}>{getEcoDate()}</Text>
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
                  onChangeText={(text) => setEcoWeeks(text)}
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
                  onChangeText={(text) => setEcoDays(text)}
                  keyboardType="numeric"
                  placeholder="N° días"
                  placeholderTextColor="#9B9B9B"
                ></TextInput>
              </View>
            </View>
          </React.Fragment>
        ) : null}

        <TouchableWithoutFeedback onPress={showPickDatepicker}>
          <View style={styles.containerInputText}>
            <Text styles={styles.titleInputText}>Fecha</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 9 }}>
                <Text style={styles.inputText}>{formatDate(pickDate)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputTextIcon}>{icon}</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.buttonContainer}>
          {method === FUR ? (
            <TouchableOpacity style={styles.button} onPress={calculateFurDate}>
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>
          ) : null}

          {method === FUR_OPERACIONAL ? (
            <TouchableOpacity
              style={styles.button}
              onPress={calculateFurOperationalDate}
            >
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity style={styles.buttonReset} onPress={resetDate}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.inputText}>{gestacionalAge}</Text>
            <Text style={{ color: "#9B9B9B" }}>Edad Gestacional</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={styles.inputText}>{preNatalDate}</Text>
            <Text style={{ color: "#9B9B9B" }}>Licencia Prenatal</Text>
          </View>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={styles.inputText}>{fifthMonthDate}</Text>
            <Text style={{ color: "#9B9B9B" }}>Quinto Mes</Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={styles.inputText}>{dueDate}</Text>
            <Text style={{ color: "#9B9B9B" }}>Parto</Text>
          </View>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePickerFurDate"
            value={value}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            style={{ backgroundColor: "red" }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
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
  buttonContainer: {
    flexDirection: "row",
    margin: 30,
    justifyContent: "center",
  },
  button: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#534658",
    padding: 10,
    marginRight: 10,
  },
  buttonReset: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#9B9B9B",
    padding: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
  },
});
