import {
  View,
  Text,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {  useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";
import { StyleSheet } from "react-native";
import { useAppDispatch } from "src/redux/hooks";
import { setToken } from "src/redux/features/auth/authSlice";
import PrimaryButton from "src/components/shared/PrimaryButton";
import { RootStackParamList } from "src/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<RootStackParamList>

const OnBoarding = () => {
  const navigation = useNavigation<NavigationProp>()
  const [googleLoading, setGoogleLoading] = useState(false);
  const dispatch = useAppDispatch();

 

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
    });
  }, [navigation]);

  return (

    <SafeAreaView className="flex-1 bg-[#121212] ">
      <ImageBackground
        source={require("../../../assets/home/ON.png")}
        style={{ flex: 1, width: "100%", height: "100%" }}
        resizeMode="cover"
      >
        <View className="flex-1 items-center justify-end px-4 mb-5 p-3 ">
          <View className="w-full mb-6 bg-white/90 rounded-2xl px-4 py-3 items-start">
            <View style={{ width: scale(200), height: verticalScale(40) }}>
              <Image
                source={require("../../../assets/home/voc.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Tagline */}
          <View className="w-full mb-13">
            <Text className="text-white font-instrumentSansBold text-3xl leading-9">
              দেশের প্রথম এআই ভিত্তিক ইংরেজী শেখার প্ল্যাটফরম
            </Text>
          </View>


          <PrimaryButton
            title="Log In"
            onPress={() => navigation.navigate("Login Screen")}
            className="mt-5 mb-2 border border-white"
            textClass="text-white"
          />

          <PrimaryButton
            title="Sign Up"
            onPress={() => navigation.navigate("Sign Up as User")}
            className="mt-2 mb-2 border border-white"
            textClass="text-white"
          />
          <View className="flex-row items-center w-full my-3">
            <View className="flex-1 h-px bg-white/20" />
            <Text className="text-white/40 text-xs font-medium mx-3 tracking-widest">OR</Text>
            <View className="flex-1 h-px bg-white/20" />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  googleButton: {
    width: "100%",
    height: 55,
    marginTop: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});

export default OnBoarding;
