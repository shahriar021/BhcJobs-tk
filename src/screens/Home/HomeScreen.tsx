import React, { useLayoutEffect, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList, Image, TextInput, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useGetIndustriesQuery, useGetPopularCompaniesQuery, useGetRecommendedJobsQuery } from "src/redux/features/home/homeApi";

// ✅ BASE URL
const BASE_URL = "https://api.bhcjobs.com/storage";

// ✅ NORMALIZERS
const normalizeIndustry = (item) => ({
  id: item?.id,
  name: item?.name || "Industry",
  jobCount: item?.jobs_count || 0,
  image: item?.image ? `${BASE_URL}/industry-image/${item.image}` : null,
});

const normalizeCompany = (item) => {
  const c = item?.company || {};
  return {
    id: c?.id,
    name: c?.name || "Company",
    jobCount: item?.jobs_count || 0,
    logo: c?.image ? `${BASE_URL}/company-image/${c.image}` : null,
  };
};

const normalizeJob = (job) => ({
  id: job?.id,
  title: job?.industry_name || "Job Role",
  company_name: job?.company_name,
  salary: job?.currency || "N/A",
  location: job?.country?.name || "Saudi Arabia",
  type: job?.employment_type || "Full Time",
  experience: job?.experience ? `${job.experience} yrs` : "N/A",
  company_logo: job?.company?.image ? `${BASE_URL}/company-image/${job.company.image}` : null,
});

// 🎯 HERO
const HeroBanner = () => (
  <View
    style={{
      backgroundColor: "#1a6b3c",
      paddingTop: 40,
      paddingBottom: 30,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    }}
  >
    <Text style={{ color: "#a8f0c6", marginBottom: 6 }}>Find your dream job 🇧🇩 → 🇸🇦</Text>
    <Text style={{ color: "white", fontSize: 26, fontWeight: "700" }}>Discover Jobs in{"\n"}Saudi Arabia</Text>

    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginTop: 16,
        elevation: 3,
      }}
    >
      <Feather name="search" size={18} color="#999" />
      <TextInput placeholder="Search jobs, companies..." style={{ flex: 1, marginLeft: 10 }} />
    </View>
  </View>
);

// 🎯 HEADER
const SectionHeader = ({ title, onSeeAll }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
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

// 🎯 INDUSTRY CARD
const IndustryCard = ({ item }) => (
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

// 🎯 JOB CARD
const JobCard = ({ item, onPress }) => (
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

// 🎯 COMPANY CARD
const CompanyCard = ({ item }) => (
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

const LoadingRow = () => (
  <View style={{ padding: 20 }}>
    <ActivityIndicator color="#1a6b3c" />
  </View>
);

// 🚀 MAIN
const HomeScreen = () => {
  const navigation = useNavigation();

  const { data: industriesData, isLoading: iLoad } = useGetIndustriesQuery({});
  const { data: jobsData, isLoading: jLoad } = useGetRecommendedJobsQuery({});
  const { data: companiesData, isLoading: cLoad } = useGetPopularCompaniesQuery({});

  const industries = useMemo(() => (industriesData?.data || []).map(normalizeIndustry), [industriesData]);
  const jobs = useMemo(() => (jobsData?.data || []).map(normalizeJob), [jobsData]);
  const companies = useMemo(() => (companiesData?.data || []).map(normalizeCompany), [companiesData]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: "" });
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f6f7f9" }}>
      <HeroBanner />

      <View style={{ padding: 20 }}>
        <SectionHeader title="Popular Industries" />
        {iLoad ? (
          <LoadingRow />
        ) : (
          <FlatList
            data={industries}
            horizontal
            keyExtractor={(item) => item.id?.toString()}
            renderItem={({ item }) => <IndustryCard item={item} />}
          />
        )}

        <SectionHeader title="Recommended Jobs" />
        {jLoad ? (
          <LoadingRow />
        ) : (
          jobs.slice(0, 4).map((job) => <JobCard key={job.id} item={job} onPress={() => navigation.navigate("JobDetail", { job })} />)
        )}

        <SectionHeader title="Popular Companies" />
        {cLoad ? (
          <LoadingRow />
        ) : (
          <FlatList
            data={companies}
            horizontal
            keyExtractor={(item) => item.id?.toString()}
            renderItem={({ item }) => <CompanyCard item={item} />}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
