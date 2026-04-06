import React from 'react'
import { Text, View } from 'react-native';

export const Section = ({ title, children }: any) => (
  <View className="mx-5 mt-5 bg-white rounded-2xl p-4 shadow-sm">
    <Text className="text-[15px] font-bold text-[#111] mb-3 border-l-[3px] border-[#2FA4D7] pl-[10px]">
      {title}
    </Text>
    {children}
  </View>
);
