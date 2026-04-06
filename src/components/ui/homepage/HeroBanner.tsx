import React from "react"
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, View } from "react-native";
import WaveAnimation from "./WaveAnimation";

const HeroBanner = () => (
  <LinearGradient
    colors={["#2FA4D7", "#7EC4E8"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={{
      paddingTop: 50,
      paddingHorizontal: 20,
      overflow: "hidden",
    }}
  >
    <Text style={{ color: "white", opacity: 0.9, marginBottom: 6, textAlign: "center" }}>
      Find your dream job 🇧🇩 → 🇸🇦
    </Text>
    <Text style={{ color: "white", fontSize: 26, fontWeight: "700", textAlign: "center" }}>
      Discover Jobs in{"\n"}Saudi Arabia
    </Text>

    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginTop: 20,
        elevation: 3,
      }}
    >
      <Feather name="search" size={18} color="#999" />
      <TextInput
        placeholder="Search jobs, companies..."
        style={{ flex: 1, marginLeft: 10 }}
      />
    </View>
    <View style={{ marginHorizontal: -20, marginBottom: 0 }}>
      <WaveAnimation />
    </View>
  </LinearGradient>
);

export default HeroBanner