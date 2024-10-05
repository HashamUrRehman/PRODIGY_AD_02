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
      <Text style={styles.header}>To-Do-List</Text>
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
container: {
  flex: 1,
  padding: 30,
  backgroundColor: '#F5F5F5', 
},
header: {
  fontSize: 40,
  fontWeight: 'bold',
  color: '#333', 
  marginBottom: 20,
  marginTop: 60,
  textAlign: 'center', 
},
inputContainer: {
  flexDirection: 'row',
  marginBottom: 40,
  alignItems: 'center', 
},
input: {
  flex: 1,
  borderColor: '#CCC',
  borderWidth: 2.5,
  padding: 15,
  borderRadius: 12, 
  backgroundColor: '#FFF',
  elevation: 2, 
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 1,
},
addButton: {
  backgroundColor: '#007BFF', 
  padding: 15,
  borderRadius: 10, 
  marginLeft: 10,
  elevation: 2, 
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
},
addButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 18, 
},
taskContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center', 
  padding: 15,
  marginBottom: 10,
  backgroundColor: '#FFF',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#E5E5E5',
  elevation: 1, 
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 8,
},
taskText: {
  fontSize: 18,
  color: '#333',
},
buttonsContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
editButton: {
  color: '#28A745', 
  marginRight: 15,
  fontSize: 16, 
},
deleteButton: {
  color: '#FF0000', 
  fontSize: 16,
},

});
