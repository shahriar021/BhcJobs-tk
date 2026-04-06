import { MaterialIcons } from '@expo/vector-icons';
import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native';
import { NormalizedIndustry } from 'src/types';

const IndustryCard = ({ item }: { item: NormalizedIndustry }) => (
  <TouchableOpacity
    style={{
      backgroundColor: "#fff",
      borderRadius: 14,
      padding: 14,
      alignItems: "center",
      marginRight: 12,
      width: 110,
      elevation: 2,
    }}
  >
    {item.image ? (
      <Image source={{ uri: item.image }} style={{ width: 40, height: 40, marginBottom: 8 }} />
    ) : (
      <MaterialIcons name="work" size={24} color="#1a6b3c" />
    )}
    <Text style={{ color: "#222", fontSize: 12 }} numberOfLines={2}>
      {item.name}
    </Text>
    <Text style={{ color: "#777", fontSize: 10 }}>{item.jobCount} jobs</Text>
  </TouchableOpacity>
);

export default IndustryCard
