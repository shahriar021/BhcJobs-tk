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
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import RenderHTML from "react-native-render-html";
import { JobDetails } from "src/types";

const BASE_URL = process.env.EXPO_PUBLIC_STORAGE_URL!

// Helpers
const formatSalary = (job: any) => {
  if (!job.min_salary) return "Negotiable";
  const max = job.max_salary ? ` – ${job.max_salary}` : "";
  return `${job.currency} ${job.min_salary}${max} / ${job.salary_type}`;
};

const formatEmploymentType = (type: string) =>
  type?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "—";

// Chip
const Chip = ({ icon, label }: { icon: string; label: string }) => (
  <View className="flex-row items-center bg-[#eef7fc] rounded-full px-[10px] py-[6px] mr-2 mb-2">
    <Feather name={icon as any} size={13} color="#2FA4D7" />
    <Text className="text-[12px] text-[#333] ml-[5px]">{label}</Text>
  </View>
);

// Section
const Section = ({ title, children }: any) => (
  <View className="mx-5 mt-5 bg-white rounded-2xl p-4 shadow-sm">
    <Text className="text-[15px] font-bold text-[#111] mb-3 border-l-[3px] border-[#2FA4D7] pl-[10px]">
      {title}
    </Text>
    {children}
  </View>
);

// Badge
const Badge = ({ label, active }: any) => (
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
      {/* Header */}
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
        {/* Salary */}
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

        {/* Chips */}
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

        {/* Benefits */}
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

        {/* Description */}
        {job.job_desc && (
          <Section title="Job Description">
            <RenderHTML contentWidth={width} source={{ html: job.job_desc }} />
          </Section>
        )}

        {/* Requirements */}
        {job.job_requirement && (
          <Section title="Requirements">
            <RenderHTML contentWidth={width} source={{ html: job.job_requirement }} />
          </Section>
        )}

        {/* Process */}
        {job.recruitment_process && (
          <Section title="Recruitment Process">
            <RenderHTML contentWidth={width} source={{ html: job.recruitment_process }} />
          </Section>
        )}

        {/* Skills */}
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

        {/* Languages */}
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

        {/* Expiry */}
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

      {/* Apply Button */}
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