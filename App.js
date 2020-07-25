import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import DateDisplay from "./components/DatesDisplay";
import GestacionalAgeMenu from "./components/GestacionalAgeMenu";
import InputDateContainer from "./components/InputDatesContainer";

export default function App() {
  const FUR = "FUR";
  const FUR_OPERACIONAL = "FUR OPERACIONAL";

  const DAYS_TO_DUE_DATE = 280;
  const DAYS_TO_PRE_NATAL = 238;
  const DAYS_TO_FIFTH_MONTH = 126;

  const [method, setMethod] = useState(FUR);

  const [furDate, setFurDate] = useState(false);
  const [furOperacionalDate, setFurOperacionalDate] = useState(false);

  const [ecoDate, setEcoDate] = useState(false);
  const [ecoWeeks, setEcoWeeks] = useState(0);
  const [ecoDays, setEcoDays] = useState(0);

  const [pickDate, setPickDate] = useState(new Date());
  const [gestacionalAge, setGestacionalAge] = useState("--");
  const [dueDate, setDueDate] = useState();
  const [preNatalDate, setPreNatalDate] = useState();
  const [fifthMonthDate, setFithMonthDate] = useState();

  const [weeks, setWeeks] = useState(0);
  const [days, setDays] = useState(0);

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(false);
  const [modifyDate, setModifyDate] = useState("");

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

  const calculateDates = (referenceDate) => {
    if (referenceDate) {
      const newDueDate = new Date(referenceDate);
      const newPrenatalDate = new Date(referenceDate);
      const newFifthMonthDate = new Date(referenceDate);

      newDueDate.setDate(newDueDate.getDate() + DAYS_TO_DUE_DATE);
      newPrenatalDate.setDate(newPrenatalDate.getDate() + DAYS_TO_PRE_NATAL);
      newFifthMonthDate.setDate(
        newFifthMonthDate.getDate() + DAYS_TO_FIFTH_MONTH
      );

      setDueDate(newDueDate.toString());
      setPreNatalDate(newPrenatalDate.toString());
      setFithMonthDate(newFifthMonthDate.toString());
    } else {
      setDueDate(false);
      setPreNatalDate(false);
      setFithMonthDate(false);
    }
  };

  resetDate = () => {
    setFurDate(false);
    setFurOperacionalDate(false);
    setEcoDate(false);
    setPickDate(new Date());
    setWeeks(0);
    setDays(0);
    setEcoWeeks(0);
    setEcoDays(0);
    setGestacionalAge("--");
    setDueDate(false);
    setPreNatalDate(false);
    setFithMonthDate(false);
  };

  const calculateFurDate = () => {
    gestationalAgeInWeeks(furDate);
    calculateDates(furDate);
  };

  const calculateFurOperationalDate = () => {
    let furOperacionalDate = false;

    if (ecoDate && !isNaN(ecoWeeks) && !isNaN(ecoDays)) {
      furOperacionalDate = new Date(ecoDate);
      const dias = parseInt(ecoWeeks) * 7 + parseInt(ecoDays);
      furOperacionalDate.setDate(furOperacionalDate.getDate() - dias);
    }

    gestationalAgeInWeeks(furOperacionalDate);
    calculateDates(furOperacionalDate);

    setFurOperacionalDate(furOperacionalDate.toString());
  };

  const gestationalAgeInWeeks = (referenceDate) => {
    if (referenceDate) {
      const diffDate = Math.abs(referenceDate - pickDate);
      const diffDays = Math.ceil(diffDate / (1000 * 60 * 60 * 24));

      const numberWeeks = Math.trunc(diffDays / 7);
      const weeksInDays = numberWeeks * 7;

      setWeeks(numberWeeks);
      setDays(diffDays - weeksInDays);

      calculateGestacionalAge(numberWeeks, diffDays - weeksInDays);
    }
  };

  const calculateGestacionalAge = (weeks, days) => {
    let gestacionalDate = "";

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

  return (
    <View style={styles.container}>
      <GestacionalAgeMenu
        method={method}
        FUR={FUR}
        changeMethodFUR={changeMethodFUR}
        changeMethodFUROPERACIONAL={changeMethodFUROPERACIONAL}
      />

      <View
        style={{
          flex: 80,
          width: "100%",
          alignItems: "center",
        }}
      >
        <StatusBar style="light" />

        <InputDateContainer
          method={method}
          FUR={FUR}
          FUR_OPERACIONAL={FUR_OPERACIONAL}
          furDate={furDate}
          showFurDatepicker={showFurDatepicker}
          ecoDate={ecoDate}
          showEcoDatepicker={showEcoDatepicker}
          setEcoDays={setEcoDays}
          setEcoWeeks={setEcoWeeks}
          pickDate={pickDate}
          showPickDatepicker={showPickDatepicker}
          value={value}
          mode={mode}
          onChange={onChange}
          show={show}
        />

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

        <DateDisplay
          gestacionalAge={gestacionalAge}
          preNatalDate={preNatalDate}
          fifthMonthDate={fifthMonthDate}
          dueDate={dueDate}
          furOperacionalDate={furOperacionalDate}
          method={method}
          FUR_OPERACIONAL={FUR_OPERACIONAL}
        />
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
