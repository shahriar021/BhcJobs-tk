import React, { useLayoutEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import PrimaryButton from "src/components/shared/PrimaryButton";
import InputField from "src/components/shared/InputField";
import { setToken } from "src/redux/features/auth/authSlice";
import { useLoginMutation } from "src/redux/features/auth/authApi";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "src/types";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<RootStackParamList>

const Login = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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

 const handleLogin = async () => {
   if (!phone.trim()) return Alert.alert("Error", "Please enter your phone number");
   if (!password.trim()) return Alert.alert("Error", "Please enter your password");

   const formData = new FormData();
   formData.append("phone", phone);
   formData.append("password", password);

   try {
     const res = await login(formData).unwrap();

     if (res.status) {
       dispatch(setToken(res.data.token)); 
     }
   } catch (err: any) {
     Alert.alert("Error", err?.data?.message || "Login failed");
   }
 };
  return (
    <LinearGradient
      colors={["#2FA4D7", "#ffffff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, padding: 20 }}>
          {/* Top Section */}
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.95)",
              borderRadius: 16,
              padding: 24,
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 4,
            }}
          >
            <Text style={{ fontSize: 28, fontWeight: "bold", color: "#121212" }}>
              Login
            </Text>
            <Text style={{ fontSize: 14, color: "#555", marginTop: 8 }}>
              Welcome back! Please sign in to continue.
            </Text>
          </View>

          {/* Spacer pushes bottom card to middle */}
          <View style={{ flex: 1, justifyContent: "center" }}>
            {/* Bottom Section (Form) */}
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
              <InputField
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
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
                className="bg-[#2FA4D7] mt-4 mb-3"
                textClass="text-white text-lg"
              />

              <TouchableOpacity
                onPress={() => navigation.navigate("Sign Up as User")}
                style={{ alignItems: "center", marginTop: 12 }}
              >
                <Text style={{ color: "#444" }}>
                  Don't have an account?{" "}
                  <Text style={{ color: "#2FA4D7", fontWeight: "bold" }}>
                    Sign Up
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Login;
