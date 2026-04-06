import {
  View,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";
import PrimaryButton from "src/components/shared/PrimaryButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "src/types";

type NavigationProp = StackNavigationProp<RootStackParamList>

const OnBoarding = () => {
  const navigation = useNavigation<NavigationProp>()

  return (
    <LinearGradient
      colors={["#2FA4D7", "#fff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, paddingTop: 52, paddingHorizontal: 20, paddingBottom: 30 }}
    >
      <SafeAreaView className="flex-1  ">
        <View className="flex-1 items-center justify-around px-4 mb-5 p-3 ">
          <View className="w-full mb-6 bg-white/90 rounded-2xl px-4 py-3 items-center">
            <View style={{ width: scale(200), height: verticalScale(40) }}>
              <Image
                source={require("../../../assets/home/logo_day_mode.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </View>
          </View>
          <View className="w-full">
            <PrimaryButton
              title="Log In"
              onPress={() => navigation.navigate("Login Screen")}
              className="bg-white mt-2 mb-3"
              textClass="text-[#121212] text-xl"
            />

            <PrimaryButton
              title="Sign Up"
              onPress={() => navigation.navigate("Sign Up as User")}
              className="bg-white mt-2 mb-3"
              textClass="text-[#121212] text-xl"
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>

  );
};

export default OnBoarding;
