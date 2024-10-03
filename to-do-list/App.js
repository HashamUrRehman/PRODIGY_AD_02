import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: newTask }]);
      setNewTask('');
    }
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setNewTask(taskToEdit.text);
    setEditingTask(id);
  };

  const updateTask = () => {
    setTasks(tasks.map((task) => (task.id === editingTask ? { ...task, text: newTask } : task)));
    setNewTask('');
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task..."
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={editingTask ? updateTask : addTask}>
          <Text style={styles.addButtonText}>{editingTask ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.text}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => editTask(item.id)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#fff' },
  header: { fontSize: 40, fontWeight: 'bold', marginBottom: 20, marginTop: 70, },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, borderColor: '#ddd', borderWidth: 2, padding: 10, borderRadius: 10 },
  addButton: { backgroundColor: 'black', padding: 10, borderRadius: 10, marginLeft: 10 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  taskContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  taskText: { fontSize: 18 },
  buttonsContainer: { flexDirection: 'row' },
  editButton: { color: '#007BFF', marginRight: 10 },
  deleteButton: { color: '#FF0000' },
});
