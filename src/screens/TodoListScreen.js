import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodo,
  toggleTodo,
  removeTodo,
  createTodo,
} from "../redux/todoSlice";

const TodoItem = React.memo(({ item, index, navigation, dispatch }) => {

  return (
    <Animated.View entering={FadeInDown.delay(index * 60).duration(400)}>
      <View style={styles.row}>

        <TouchableOpacity
          style={[
            styles.checkbox,
            item.completed ? styles.checked : styles.unchecked,
          ]}
          onPress={() => dispatch(toggleTodo({ id: item.id,completed:1 }))}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("TodoDetail", { todo: item })}
          style={{ flex: 1 }}
        >
          <Text
            style={[styles.title, item.completed && styles.completedText]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => dispatch(removeTodo({ id: item.id }))}>
          <Text style={styles.delete}>✕</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
});

export default function TodoListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);

  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  // Load only ONCE
  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  // Add new todo
  const handleAddTodo = () => {
    if (!newTitle.trim()) return;

    dispatch(createTodo({ title: newTitle, description: "" }));
    setNewTitle("");
    setAdding(false);
  };

  // Memoized renderItem (stable reference)
  const renderItem = useCallback(
    ({ item, index }) => (
      <TodoItem
        item={item}
        index={index}
        navigation={navigation}
        dispatch={dispatch}
      />
    ),[dispatch, navigation]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>tasked</Text>

      {adding && (
        <View style={styles.addRow}>
          <View style={styles.checkbox} />

          <TextInput
            autoFocus
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder="New task..."
            style={styles.addInput}
          />

          <TouchableOpacity onPress={handleAddTodo}>
            <Text style={styles.addDone}>✓</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        removeClippedSubviews
        initialNumToRender={12}
        windowSize={5}
      />

      {!adding && (
        <TouchableOpacity style={styles.fab} onPress={() => setAdding(true)}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  header: { fontSize: 32, fontWeight: "bold", marginBottom: 20 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  unchecked: {
    backgroundColor: "#000",
  },

  checked: {
    backgroundColor: "#6bd6cf",
  },

  checkmark: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  title: { fontSize: 16, color: "#333" },

  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },

  delete: { color: "#ff4d4d", fontSize: 20, paddingHorizontal: 10 },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#4db6ac",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  fabText: {
    fontSize: 34,
    color: "white",
    marginTop: -3,
  },

  addRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  addInput: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 6,
  },

  addDone: {
    fontSize: 26,
    color: "#00bfa5",
    marginLeft: 10,
  },
});
