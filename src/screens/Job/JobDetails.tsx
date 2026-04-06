import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import RenderHTML from "react-native-render-html";
import { JobDetails } from "src/types";
import { formatEmploymentType, formatSalary } from "src/utils.ts/jobDetailsHelper";
import { Chip } from "src/components/ui/jobdetails/Chip";
import { Section } from "src/components/ui/jobdetails/Section";
import { Badge } from "src/components/ui/jobdetails/Badge";

const BASE_URL = process.env.EXPO_PUBLIC_STORAGE_URL!

const JobDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { width } = useWindowDimensions();
  const { job } = route.params as { job: JobDetails };

  const logo = job?.company?.image
    ? `${BASE_URL}/company-image/${job.company.image}`
    : null;

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <View className="flex-1 bg-[#f6f7f9]">
      <LinearGradient
        colors={["#2FA4D7", "#7EC4E8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 52, paddingHorizontal: 20, paddingBottom: 30 }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-[38px] h-[38px] rounded-xl bg-white/20 justify-center items-center mb-4"
        >
          <Feather name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>

        <Text className="text-white/80 text-[13px] mb-3">
          Job Details
        </Text>

        <View className="bg-white rounded-2xl p-4 flex-row items-center shadow-md">
          <View className="w-[56px] h-[56px] rounded-xl bg-[#eef7fc] justify-center items-center mr-3">
            {logo ? (
              <Image
                source={{ uri: logo }}
                className="w-[56px] h-[56px] rounded-xl"
              />
            ) : (
              <Feather name="briefcase" size={28} color="#2FA4D7" />
            )}
          </View>

          <View className="flex-1">
            <Text className="text-[16px] font-bold text-[#111]">
              {job.job_title}
            </Text>
            <Text className="text-[13px] text-[#555] mt-[2px]">
              {job.company_name}
            </Text>
            <Text className="text-[11px] text-[#2FA4D7] mt-[2px]">
              {job.industry_name}
            </Text>
          </View>

          {job.is_hot === 1 && (
            <View className="bg-[#e74c3c] rounded-md px-2 py-[4px]">
              <Text className="text-white text-[10px] font-bold">
                🔥 HOT
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-between items-center px-5 pt-5 pb-2">
          <View>
            <Text className="text-[12px] text-[#999]">Salary</Text>
            <Text className="text-[18px] font-extrabold text-[#111] mt-[2px]">
              {formatSalary(job)}
            </Text>
          </View>

          <View className="bg-[#eef7fc] rounded-full px-3 py-[6px]">
            <Text className="text-[#2FA4D7] font-bold text-[12px]">
              {formatEmploymentType(job.employment_type)}
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap px-5 mb-2">
          <Chip icon="map-pin" label={job.country?.name || "Saudi Arabia"} />
          <Chip icon="clock" label={`${job.working_hours}h / day`} />
          <Chip icon="calendar" label={`${job.working_days} days/wk`} />
          <Chip icon="briefcase" label={`${job.experience} yrs exp`} />
          <Chip icon="users" label={`${job.vacancy} vacancies`} />
          <Chip icon="eye" label={`${job.view_count} views`} />
          <Chip icon="user" label={`Age ${job.min_age}–${job.max_age}`} />
          {job.gender && (
            <Chip
              icon="user"
              label={
                job.gender.charAt(0).toUpperCase() +
                job.gender.slice(1)
              }
            />
          )}
        </View>

        <Section title="Benefits & Perks">
          <View className="flex-row flex-wrap">
            <Badge label="Accommodation" active={job.accommodation === 1} />
            <Badge label="Transportation" active={job.transportation === 1} />
            <Badge label="Medical" active={job.medical_service === 1} />
            <Badge label="Iqama" active={job.iqama === 1} />
            <Badge label="Overtime" active={job.is_overtime_allowed === 1} />
            {job.food_option === "allowance" && (
              <Badge label={`Food SAR ${job.food_amount}`} active />
            )}
          </View>
        </Section>

        {job.job_desc && (
          <Section title="Job Description">
            <RenderHTML contentWidth={width} source={{ html: job.job_desc }} />
          </Section>
        )}
        {job.job_requirement && (
          <Section title="Requirements">
            <RenderHTML contentWidth={width} source={{ html: job.job_requirement }} />
          </Section>
        )}

        {job.recruitment_process && (
          <Section title="Recruitment Process">
            <RenderHTML contentWidth={width} source={{ html: job.recruitment_process }} />
          </Section>
        )}

        {job.hard_skills?.length > 0 && (
          <Section title="Skills Required">
            <View className="flex-row flex-wrap">
              {job.hard_skills.map((s: any, i: number) => (
                <View
                  key={i}
                  className="bg-[#eef7fc] rounded-full px-3 py-[6px] mr-2 mb-2"
                >
                  <Text className="text-[12px] text-[#2FA4D7] font-semibold">
                    {s?.name || s}
                  </Text>
                </View>
              ))}
            </View>
          </Section>
        )}

        {job.languages?.length > 0 && (
          <Section title="Languages">
            <View className="flex-row flex-wrap">
              {job.languages.map((l: any, i: number) => (
                <View
                  key={i}
                  className="bg-[#eef7fc] rounded-full px-3 py-[6px] mr-2 mb-2"
                >
                  <Text className="text-[12px] text-[#2FA4D7] font-semibold">
                    {l?.name || l}
                  </Text>
                </View>
              ))}
            </View>
          </Section>
        )}

        {job.expiry && (
          <View className="flex-row items-center mx-5 mt-4 bg-[#fff8f0] rounded-lg p-3 border-l-[3px] border-[#e67e22]">
            <Feather name="alert-circle" size={14} color="#e67e22" />
            <Text className="text-[13px] text-[#e67e22] ml-2">
              Apply before:{" "}
              <Text className="font-bold">
                {new Date(job.expiry).toDateString()}
              </Text>
            </Text>
          </View>
        )}
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 pb-7 shadow-lg">
        <TouchableOpacity className="rounded-xl overflow-hidden">
          <LinearGradient
            colors={["#2FA4D7", "#1a85b8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 16,
              gap: 8,
            }}
          >
            <Text className="text-white text-[16px] font-bold">
              Apply Now
            </Text>
            <Feather name="arrow-right" size={18} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobDetailScreen;