import { Feather } from '@expo/vector-icons';
import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native';
import { NormalizedCompany } from 'src/types';

const CompanyCard = ({ item }:{item:NormalizedCompany}) => (
  <TouchableOpacity
    style={{
      backgroundColor: "#fff",
      borderRadius: 14,
      padding: 14,
      alignItems: "center",
      marginRight: 12,
      width: 120,
      elevation: 2,
    }}
  >
    {item.logo ? (
      <Image source={{ uri: item.logo }} style={{ width: 50, height: 50, marginBottom: 8 }} />
    ) : (
      <Feather name="home" size={24} />
    )}
    <Text style={{ fontSize: 12, fontWeight: "600" }} numberOfLines={2}>
      {item.name}
    </Text>
    <Text style={{ fontSize: 10, color: "#777" }}>{item.jobCount} openings</Text>
  </TouchableOpacity>
);

export default CompanyCard