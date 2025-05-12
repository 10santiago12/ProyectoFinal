import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MainPage() {
return (
<View style={styles.container}>
    <Text style={styles.text}>Este es el mainpage</Text>
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
backgroundColor: "#F0FDF4",
},
text: {
fontSize: 20,
fontWeight: "bold",
color: "#111827",
},
});
