import React, { useLayoutEffect, useMemo } from "react";
import { View, ScrollView, TouchableOpacity, FlatList, Image, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGetIndustriesQuery, useGetPopularCompaniesQuery, useGetRecommendedJobsQuery } from "src/redux/features/home/homeApi";
import HeroBanner from "src/components/ui/homepage/HeroBanner";
import SectionHeader from "src/components/ui/homepage/SectionHeader";
import IndustryCard from "src/components/ui/homepage/IndustryCard";
import JobCard from "src/components/ui/homepage/JobCard";
import CompanyCard from "src/components/ui/homepage/CompanyCard";
import { normalizeCompany, normalizeIndustry, normalizeJob } from "src/utils.ts/normalizers";
import Loading from "src/components/shared/Loading";
import { NormalizedCompany, NormalizedIndustry, NormalizedJob, RootStackParamList } from "src/types";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<RootStackParamList>

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const { data: industriesData, isLoading: iLoad } = useGetIndustriesQuery({});
  const { data: jobsData, isLoading: jLoad } = useGetRecommendedJobsQuery({});
  const { data: companiesData, isLoading: cLoad } = useGetPopularCompaniesQuery({});

  const industries = useMemo<NormalizedIndustry[]>(() => (industriesData?.data || []).map(normalizeIndustry), [industriesData]);
  const jobs = useMemo<NormalizedJob[]>(() => (jobsData?.data || []).map(normalizeJob), [jobsData]);
  const companies = useMemo<NormalizedCompany[]>(() => (companiesData?.data || []).map(normalizeCompany), [companiesData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#f6f7f9",
        height: 70, // ✅ taller header
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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f6f7f9" }}>
      <HeroBanner />

      <View style={{ padding: 20 }}>
        <SectionHeader title="Popular Industries" />
        {iLoad ? (
          <Loading/>
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
          <Loading/>
        ) : (
          jobs.slice(0, 4).map((job) => <JobCard key={job.id} item={job} onPress={() => navigation.navigate("JobDetail", { job })} />)
        )}

        <SectionHeader title="Popular Companies" />
        {cLoad ? (
          <Loading/>
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
