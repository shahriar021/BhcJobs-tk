import React, { useLayoutEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import PrimaryButton from "src/components/shared/PrimaryButton";
import InputField from "src/components/shared/InputField";
import { setToken } from "src/redux/features/auth/authSlice";
import { useLoginMutation } from "src/redux/features/auth/authApi";

const Login = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
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

 const handleLogin = async () => {
   if (!phone.trim()) return Alert.alert("Error", "Please enter your phone number");
   if (!password.trim()) return Alert.alert("Error", "Please enter your password");

   const formData = new FormData();
   formData.append("phone", phone);
   formData.append("password", password);

   try {
     const res = await login(formData).unwrap();
     console.log(res);

     if (res.status) {
       dispatch(setToken(res.data.token)); // adjust to your API response
       navigation.navigate("Home");
     }
   } catch (err: any) {
     Alert.alert("Error", err?.data?.message || "Login failed");
   }
 };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Login</Text>

      <InputField placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        showToggle
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />

      <PrimaryButton
        title="Login"
        onPress={handleLogin}
        loading={isLoading}
        className="bg-white mt-2 mb-3"
        textClass="text-[#121212] text-xl"
      />

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")} className="items-center mt-2 mb-10">
        <Text style={{ color: "#aaa" }}>
          Don't have an account? <Text style={{ color: "white", fontWeight: "bold" }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Login;
