import React from 'react'
import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const Chip = ({ icon, label }: { icon: string; label: string }) => (
  <View className="flex-row items-center bg-[#eef7fc] rounded-full px-[10px] py-[6px] mr-2 mb-2">
    <Feather name={icon as any} size={13} color="#2FA4D7" />
    <Text className="text-[12px] text-[#333] ml-[5px]">{label}</Text>
  </View>
);