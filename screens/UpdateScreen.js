
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Database from "../Database";
import moment from "moment";


const UpdateScreen = ({ route, navigation }) => {
  const { hike } = route.params;
  const isFocused = useIsFocused();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [parking, setParking] = useState("");
  const [length, setLength] = useState("");
  const [difficult_level, setDifficult_level] = useState("");
  const [description, setDescription] = useState("");

  const dropDifData = [
    {label: 'Easy', value:'Easy'},
    {label: 'Normal', value:'Normal'},
    {label: 'Hard', value:'Hard'},
]

const dropParkData = [
  {label: 'Yes', value:'Yes'},
  {label: 'No', value:'No'},
]

const renderDropDown = ( item ) => {
    return (
        <Text style={styles.droptext}>{item.label}</Text> 
    );
}

  useEffect(() => {
    const fetchData = async () => {
      setName(hike.name);
      setLocation(hike.location);
      setDate(hike.date);
      setParking(hike.parking);
      setLength(hike.length);
      setDifficult_level(hike.difficult_level);
      setDescription(hike.description);   
    };

    fetchData();
  },[hike]);
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (datetime) => {
    setDate(moment(datetime).format("DD/MM/YYYY"));
    hideDatePicker();
  };

  const handleEditHike = async (id) => {
    if (!name || !location|| !date || !length || !description) {
      Alert.alert("Error", "Please enter title and description");
      return;
    }
    await Database.editHike(name, location, date, parking, length, difficult_level, description, id);
    navigation.navigate("Home");
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter location"
      />
      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        editable={false}
        value={date}
        onChangeText={setDate}
        placeholder="Enter date"
        onPressIn={showDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        value={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text style={styles.label}>Parking:</Text>
      <TextInput
        style={styles.input}
        value={parking}
        editable={false}
        placeholder="Choose Parking"
      />
      <Dropdown
        style ={styles.dropdownStyle}
        value={parking}
        onChange={item =>{
            setParking(item.value);
        }}
        placeholder=""
        onChangeText={setParking}
        data={dropParkData}
        renderItem={renderDropDown}
      />
      <Text style={styles.labelup}>Length:</Text>
      <TextInput
        style={styles.inputup}
        value={length}
        onChangeText={setLength}
        placeholder="Enter length"
      />
      <Text style={styles.labelup}>Difficult_level:</Text>
      <TextInput
        style={styles.inputup}
        value={difficult_level}
        editable={false}
      />
      <Dropdown
        style ={styles.dropdownStyle2}
        value={difficult_level}
        onChange={item =>{
            setDifficult_level(item.value);
        }}
        placeholder=""
        onChangeText={setDifficult_level}
        data={dropDifData}
        renderItem={renderDropDown}
      />
      <Text style={styles.labelup2}>Description:</Text>
      <TextInput
        style={styles.inputup2}
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.editButton} onPress={() => handleEditHike(hike.id)}>
        <Text style={styles.editButtonText}>Edit Hike</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  name_txt: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  text_style: {
    fontSize: 16,
  },

  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
  editButton: {
    transform:[{translateY: -80}],
    backgroundColor: "green",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  dropdownStyle:{
    transform:[{translateY: -50}],
  },
  dropdownStyle2:{
    transform:[{translateY: -90}],
  },
  inputup: {
    transform:[{translateY: -40}],
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
  inputup2: {
    transform:[{translateY: -80}],
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
  labelup: {
    transform:[{translateY: -40}],
    fontWeight: "bold",
    marginBottom: 8,
  },
  labelup2: {
    transform:[{translateY: -80}],
    fontWeight: "bold",
    marginBottom: 8,
  },
  droptext: {
    fontSize: 17,
    paddingVertical: 8
  },
});

export default UpdateScreen;