import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Text, View } from 'react-native';

export const Badge = ({ label, active }: any) => (
  <View
    className={`flex-row items-center rounded-full px-3 py-[6px] mr-2 mb-2 ${
      active ? "bg-[#eef7fc]" : "bg-[#f5f5f5]"
    }`}
  >
    <Ionicons
      name={active ? "checkmark-circle" : "close-circle"}
      size={14}
      color={active ? "#2FA4D7" : "#ccc"}
    />
    <Text
      className={`text-[12px] ml-[5px] ${
        active ? "text-[#2FA4D7]" : "text-[#aaa]"
      }`}
    >
      {label}
    </Text>
  </View>
);