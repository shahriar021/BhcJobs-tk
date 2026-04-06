import React, { useLayoutEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import PrimaryButton from "src/components/shared/PrimaryButton";
import InputField from "src/components/shared/InputField";
import { useSignUpUserMutation } from "src/redux/features/auth/authApi";

const SignUpUser = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useSignUpUserMutation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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

  const handleRegister = async () => {
    if (!name.trim()) return Alert.alert("Error", "Please enter your name");
    if (!phone.trim()) return Alert.alert("Error", "Please enter your phone number");
    if (!email.trim()) return Alert.alert("Error", "Please enter your email");
    if (!password.trim()) return Alert.alert("Error", "Please enter a password");
    if (password.length < 6) return Alert.alert("Error", "Password must be at least 6 characters");
    if (password !== confirmPassword) return Alert.alert("Error", "Passwords do not match");
    if (!passportNumber.trim()) return Alert.alert("Error", "Please enter your passport number");
    if (!dob.trim()) return Alert.alert("Error", "Please enter your date of birth");
    if (!gender.trim()) return Alert.alert("Error", "Please enter your gender");

    try {
      const res = await register({
        name,
        phone,
        email,
        password,
        confirm_password: confirmPassword,
        passport_number: passportNumber,
        dob,
        gender,
      }).unwrap();
      console.log(res,"response");

      if (res.status) {
        navigation.navigate("OtpVerify", {
          otp: res.data.otp,
          phone: res.data.phone,
        });
      }
    } catch (err: any) {
      Alert.alert("Error", err?.data?.message || "Registration failed");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Create Account</Text>

      <InputField placeholder="Full Name" value={name} onChangeText={setName} />
      <InputField placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <InputField placeholder="Passport Number" value={passportNumber} onChangeText={setPassportNumber} />
      <InputField placeholder="Date of Birth (YYYY-MM-DD)" value={dob} onChangeText={setDob} />
      <InputField placeholder="Gender (male/female)" value={gender} onChangeText={setGender} />
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        showToggle
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <InputField
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        showToggle
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />

      <PrimaryButton
        title="Create Account"
        onPress={handleRegister}
        loading={isLoading}
        className="bg-white mt-2 mb-3"
        textClass="text-[#121212] text-xl"
      />

      <TouchableOpacity onPress={() => navigation.navigate("Login")} className="items-center mt-2 mb-10">
        <Text style={{ color: "#aaa" }}>
          Already have an account? <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUpUser;
