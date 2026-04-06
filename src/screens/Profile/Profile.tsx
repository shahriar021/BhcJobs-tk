import React, { useLayoutEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Ionicons, } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { setToken } from 'src/redux/features/auth/authSlice';
import { useAppDispatch } from 'src/redux/hooks';

const ProfileScreen = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#f6f7f9",
        height: 70,
      },
      headerTitle: () => null,
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row gap-2 items-center"
          style={{ paddingLeft: 16 }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../../../assets/home/logo_day_mode.png")}
            style={{
              width: 120,  // ✅ bigger
              height: 45,
              resizeMode: "contain"
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const userData = {
    name: "N/A",
    email: "N/A",
    contact: "N/A",
    gender: "N/A",
    dob: "N/A",
    id: "N/A",
    completion: "11%"
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            dispatch(setToken(null));
          } catch (error: any) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <ScrollView showsVerticalScrollIndicator={false} className="px-4">

        <View className="bg-white rounded-2xl p-6 mt-6 items-center shadow-sm border border-gray-100">
          <View className="relative">
            <View className="w-24 h-24 rounded-full border-4 border-[#2FA4D7] items-center justify-center p-1">
              <FontAwesome5 name="user-alt" size={50} color="#2FA4D7" />
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 bg-gray-500 p-1.5 rounded-full border-2 border-white">
              <Ionicons name="camera" size={14} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-xl font-bold text-gray-800 mt-4">{userData.name}</Text>
          <Text className="text-gray-500 font-medium">ID : {userData.id}</Text>
        </View>

        <View className="bg-white rounded-2xl p-4 mt-4 flex-row items-center justify-between border border-gray-100 shadow-sm">
          <View className="flex-row items-center">
            <View className="bg-blue-50 p-2 rounded-lg">
              <FontAwesome5 name="user-check" size={18} color="#2FA4D7" />
            </View>
            <Text className="ml-3 text-gray-700 font-medium">Your profile is {userData.completion} completed</Text>
          </View>
          <View className="bg-yellow-400 h-2 w-12 rounded-full" />
        </View>

        <View className="bg-white rounded-2xl p-6 mt-4 mb-6 shadow-sm border border-gray-100">
          <DetailRow icon="account-outline" label="Name" value={userData.name} />
          <DetailRow icon="phone-outline" label="Contact" value={userData.contact} />
          <DetailRow icon="email-outline" label="Email" value={userData.email} />
          <DetailRow icon="map-marker-outline" label="Address" value="Not Provided" />
          <DetailRow icon="calendar-outline" label="Date Of Birth" value={userData.dob} />
          <DetailRow icon="gender-male-female" label="Gender" value={userData.gender} />

          <TouchableOpacity className="mt-4 bg-[#FF5A5A] py-3 rounded-xl items-center shadow-md shadow-blue-400" onPress={() => handleLogout()}>
            <Text className="text-white font-bold text-lg">Log Out</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <View className="flex-row items-start mb-5">
    <View className="bg-blue-50 p-2 rounded-lg mr-4">
      <MaterialCommunityIcons name={icon} size={20} color="#2FA4D7" />
    </View>
    <View className="flex-1 border-b border-gray-50 pb-2">
      <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">{label}</Text>
      <Text className="text-gray-800 text-base font-medium mt-0.5">{value}</Text>
    </View>
  </View>
);

export default ProfileScreen;