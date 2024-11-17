import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const CalculatorScreen = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(null);

  
  const handlePress = (input) => {
    if (input === '=') {
      try {
        let expression = currentInput;
  
        expression = expression.replace(/sin\(([^)]+)\)/g, (_, value) => 
          Math.sin(parseFloat(value) * (Math.PI / 180)) 
        );
        expression = expression.replace(/cos\(([^)]+)\)/g, (_, value) => 
          Math.cos(parseFloat(value) * (Math.PI / 180))
        );
        expression = expression.replace(/tan\(([^)]+)\)/g, (_, value) => 
          Math.tan(parseFloat(value) * (Math.PI / 180))
        );
  
        let result = eval(expression);
        result = parseFloat(result.toFixed(2));
  
        setHistory([...history, `${currentInput} = ${result}`]);
        setCurrentInput(result.toString());
      } catch (error) {
        setCurrentInput('Error');
      }
    } else if (input === 'C') {
      setCurrentInput('');
    } else if (input === 'M+') {
      setMemory(currentInput);
    } else if (input === 'MR') {
      setCurrentInput(memory || '');
    } else if (input === 'MC') {
      setMemory(null);
    } else {
      setCurrentInput(currentInput + input);
    }
  };
  
const handleDelete = () => {
  setHistory([]);
}

  const renderButton = (label) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handlePress(label)}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.input}>{currentInput}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>{["7", "8", "9", "/"].map(renderButton)}</View>
        <View style={styles.row}>{["4", "5", "6", "*"].map(renderButton)}</View>
        <View style={styles.row}>{["1", "2", "3", "-"].map(renderButton)}</View>
        <View style={styles.row}>{["0", ".", "=", "+"].map(renderButton)}</View>
        <View style={styles.row}>{["sin(", "cos(", "tan(", ')'].map(renderButton)}</View>
        <View style={styles.row}>
          {["C", "M+", "MR", "MC"].map(renderButton)}
        </View>
      </View>
      <View style={styles.historyView}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={styles.historyTitle}>History</Text>
          <TouchableOpacity
            style={{
              marginLeft: "auto",
            }}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.historyContainer}>
          {history.map((entry, index) => (
            <Text key={index} style={styles.historyText}>
              {entry}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  display: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: { color: "#fff", fontSize: 32, textAlign: "right" },
  buttonsContainer: {  justifyContent: "space-around" },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#444",
    borderRadius: 10,
    width: 70,
    height: 50,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 24 },
  historyContainer: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    maxHeight: 410,
  },
  historyTitle: { color: "#fff",  fontSize: 20, paddingLeft: 10, paddingTop: 5, verticalAlign: 'bottom',},
  historyText: { color: "#aaa", fontSize: 16 },
  historyView: { backgroundColor: "#340", }
});

export default CalculatorScreen;
