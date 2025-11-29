import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { createTodo, editTodo } from "../redux/todoSlice";

export default function TodoDetailScreen({ route, navigation }) {
  const { todo } = route.params || {};
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const dispatch = useDispatch();

  const handleSave = () => {
    if (todo) {
      dispatch(editTodo({ id: todo.id, title, description }));
    } else {
      dispatch(createTodo({ title, description }));
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="Description"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#4db6ac",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: { color: "white", fontSize: 18 },
});
