import React, { useLayoutEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import PrimaryButton from "src/components/shared/PrimaryButton";
import InputField from "src/components/shared/InputField";
import { useOtpVerifyMutation } from "src/redux/features/auth/authApi";

const OtpVerify = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { otp: expectedOtp, phone } = route.params;

  const [verifyOtp, { isLoading }] = useOtpVerifyMutation();
  const [otp, setOtp] = useState(String(expectedOtp ?? "")); 

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#121212" },
      headerTintColor: "#FFFFFF",
      headerTitle: () => null,
      headerLeft: () => (
        <TouchableOpacity className="flex-row gap-2 items-center" onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" size={24} color="white" />
          <Text className="font-instrumentSansBold text-white text-xl">BHCJobs</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleVerify = async () => {
    if (!otp.trim()) return Alert.alert("Error", "Please enter the OTP");

    try {
      const res = await verifyOtp({ phone, otp }).unwrap();

      if (res.status) {
        Alert.alert("Success", "Phone verified successfully!");
        navigation.navigate("Login");
      }
    } catch (err: any) {
      Alert.alert("Error", err?.data?.message || "OTP verification failed");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>Verify Phone</Text>
      <Text style={{ color: "#aaa", marginBottom: 24 }}>Enter the OTP sent to {phone}</Text>

      <InputField placeholder="Enter OTP" value={otp} onChangeText={setOtp} keyboardType="number-pad" />

      <PrimaryButton
        title="Verify"
        onPress={handleVerify}
        loading={isLoading}
        className="bg-white mt-2 mb-3"
        textClass="text-[#121212] text-xl"
      />

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")} className="items-center mt-2">
        <Text style={{ color: "#aaa" }}>
          Wrong number? <Text style={{ color: "white", fontWeight: "bold" }}>Go back</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OtpVerify;
