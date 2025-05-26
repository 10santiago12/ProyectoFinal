import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: "#3a7d44",
        tabBarInactiveTintColor: "#555",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarLabelPosition: "below-icon", // Esto es esencial
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: React.ComponentProps<typeof Ionicons>["name"];

          switch (route.name) {
            case "mainpage":
              iconName = focused ? "home" : "home-outline";
              break;
            case "scan":
              iconName = focused ? "camera" : "camera-outline";
              break;
            case "HistoryScreen":
              iconName = focused ? "time" : "time-outline";
              break;
            case "PriceHistoryScreen":
              iconName = focused ? "stats-chart" : "stats-chart-outline";
              break;
            case "ProfileScreen":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = focused ? "ellipse" : "ellipse-outline";
              break;
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 5,
          shadowOpacity: 0.1,
          height: 70,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column", // Asegura que el ícono esté sobre el texto
        },
      })}
    >
      <Tabs.Screen 
        name="mainpage" 
        options={{ title: "Home", tabBarLabel: "Home" }} 
      />
      <Tabs.Screen 
        name="scan" 
        options={{ title: "Scan", tabBarLabel: "Scan" }} 
      />
      <Tabs.Screen 
        name="HistoryScreen" 
        options={{ title: "History", tabBarLabel: "History" }} 
      />
      <Tabs.Screen 
        name="PriceHistoryScreen" 
        options={{ title: "Prices", tabBarLabel: "Prices" }} 
      />
      <Tabs.Screen 
        name="ProfileScreen" 
        options={{ title: "Profile", tabBarLabel: "Profile" }} 
      />
      <Tabs.Screen
        name="ScannerScreen"
        options={{ tabBarButton: () => null, headerShown: false }}
      />
      <Tabs.Screen
        name="HomeScreen"
        options={{ tabBarButton: () => null, headerShown: false }}
      />
      <Tabs.Screen
        name="AuthScreen"
        options={{ tabBarButton: () => null, headerShown: false }}
      />
      <Tabs.Screen
        name="SettingsScreen"
        options={{ tabBarButton: () => null, headerShown: false }}
      />
      <Tabs.Screen
        name="PersonalInfoScreen"
        options={{ tabBarButton: () => null, headerShown: false }}
      />
    </Tabs>
  );
}