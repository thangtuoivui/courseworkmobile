import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Database from "../Database";

const SearchScreen = ({ navigation }) => {
  const [hikes, setHikes] = useState([]);
  const [name, setName] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Database.getHikes();
        setHikes(data);
      } catch (error) {
        console.log("Error fetching hikes", error);
      }
    };

    fetchData();
    }, [isFocused]);

    const handleDeleteHike = async (id) => {
    await Database.deleteHike(id);
    let data = await Database.getHikes();
    setHikes(data);
  };

  const handleSearchHike = async (name) => {
    let data = await Database.searchHikes(name);
    setHikes(data);
  };

  const renderHikeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.hikeItem}
      onPress={() => navigation.navigate("Update", { hike: item })}
    >
      <Text>{item.name}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteHike(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Search"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleSearchHike(name)}>
        <Text style={styles.addButtonText}>Search hike</Text>
      </TouchableOpacity>

      <FlatList
        data={hikes}
        renderItem={renderHikeItem}
        keyExtractor={(item) => item.id.toString()}
      /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  addButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 12,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  hikeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "white",
  },
});

export default SearchScreen;