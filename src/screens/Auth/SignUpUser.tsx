import React, { useLayoutEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import PrimaryButton from "src/components/shared/PrimaryButton";
import InputField from "src/components/shared/InputField";
import { useSignUpUserMutation } from "src/redux/features/auth/authApi";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RootStackParamList } from "src/types";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<RootStackParamList>

const SignUpUser = () => {
  const navigation = useNavigation<NavigationProp>();
  const [register, { isLoading }] = useSignUpUserMutation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#2FA4D7" },
      headerTintColor: "#FFFFFF",
      headerTitle: () => null,
      headerLeft: () => (
        <TouchableOpacity className="flex-row gap-2 items-center p-3" onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" size={24} color="white" />
          <Text className="font-instrumentSansBold text-white text-xl">BHCJobs</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleRegister = async () => {
    const formattedDob = dob.toISOString().split("T")[0]; 
    if (!name.trim()) return Alert.alert("Error", "Please enter your name");
    if (phone.length < 11) return Alert.alert("Error", "Please enter your phone number correctly");
    if (!email.trim()) return Alert.alert("Error", "Please enter your email");
    if (!password.trim()) return Alert.alert("Error", "Please enter a password");
    if (password.length < 6) return Alert.alert("Error", "Password must be at least 6 characters");
    if (password !== confirmPassword) return Alert.alert("Error", "Passwords do not match");
    if (!passportNumber.trim()) return Alert.alert("Error", "Please enter your passport number");
    if (!dob) return Alert.alert("Error", "Please enter your date of birth");
    if (!gender) return Alert.alert("Error", "Please select your gender");
    try {
      const res = await register({
        name,
        phone,
        email,
        password,
        confirm_password: confirmPassword,
        passport_number: passportNumber,
        dob:formattedDob,
        gender,
      }).unwrap();
      if (res.status) {
        navigation.navigate("OtpVerify", {
          otp: res.data.otp,
          phone: res.data.phone,
        });
      } else {
        if (res.error) {
          let message = "";
          Object.keys(res.error).forEach((field) => {
            message += `${field}: ${res.error[field].join(", ")}\n`;
          });
          Alert.alert("Error", message.trim());
        } else {
          Alert.alert("Error", "Registration failed");
        }
      }
    } catch (err) {
      Alert.alert("Error", err?.data?.message || "Network or server error");
    }
  };

  return (
    <LinearGradient
      colors={["#6FC7E6", "#ffffff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: 16,
            padding: 24,
            marginBottom: 30,
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 4,
          }}
        >
          <Text style={{ fontSize: 28, fontWeight: "bold", color: "#121212" }}>
            Create Account
          </Text>
          <Text style={{ fontSize: 14, color: "#555", marginTop: 8 }}>
            Fill in your details to sign up.
          </Text>
        </View>

        {/* Form Card */}
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 16,
            padding: 20,
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <InputField placeholder="Full Name" value={name} onChangeText={setName} />
          <InputField placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <InputField placeholder="Passport Number" value={passportNumber} onChangeText={setPassportNumber} />

          {/* Date of Birth Picker */}
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={{
              backgroundColor: "#f0f0f0",
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: "#121212" }}>
              Date of Birth: {dob.toISOString().split("T")[0]}
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) setDob(selectedDate);
              }}
            />
          )}

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
            {["Male", "Female"].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setGender(option)}
                style={{
                  flex: 1,
                  backgroundColor: gender === option ? "#2FA4D7" : "#f0f0f0",
                  padding: 12,
                  borderRadius: 8,
                  marginHorizontal: 5,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: gender === option ? "white" : "#121212", fontWeight: "bold" }}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

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
            className="bg-[#2FA4D7] mt-2 mb-3"
            textClass="text-white text-xl"
          />

          <TouchableOpacity onPress={() => navigation.navigate("Login Screen")} style={{ alignItems: "center", marginTop: 12 }}>
            <Text style={{ color: "#444" }}>
              Already have an account?{" "}
              <Text style={{ color: "#2FA4D7", fontWeight: "bold" }}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SignUpUser;
