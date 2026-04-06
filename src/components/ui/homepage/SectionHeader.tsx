import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';

const SectionHeader = ({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
      marginTop:10
    }}
  >
    <Text style={{ fontSize: 18, fontWeight: "700", color: "#111" }}>{title}</Text>
    {onSeeAll && (
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={{ color: "#1a6b3c" }}>See all</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default SectionHeader