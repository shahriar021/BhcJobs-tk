import { Feather } from '@expo/vector-icons';
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NormalizedJob } from 'src/types';

const JobCard = ({ item, onPress }: { item: NormalizedJob; onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      elevation: 3,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          backgroundColor: "#eee",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 12,
        }}
      >
        {item.company_logo ? (
          <Image source={{ uri: item.company_logo }} style={{ width: 48, height: 48 }} />
        ) : (
          <Feather name="briefcase" size={20} color="#777" />
        )}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "600", fontSize: 15 }}>{item.title}</Text>
        <Text style={{ color: "#666", fontSize: 12 }}>{item.company_name}</Text>
      </View>

      <Text style={{ color: "#1a6b3c", fontWeight: "700" }}>{item.salary}</Text>
    </View>

    <View style={{ flexDirection: "row", marginTop: 10, flexWrap: "wrap" }}>
      {[item.location, item.type, item.experience].map((tag, i) => (
        <View
          key={i}
          style={{
            backgroundColor: "#f1f5f3",
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
            marginRight: 6,
            marginTop: 6,
          }}
        >
          <Text style={{ fontSize: 11, color: "#555" }}>{tag}</Text>
        </View>
      ))}
    </View>
  </TouchableOpacity>
);

export default JobCard