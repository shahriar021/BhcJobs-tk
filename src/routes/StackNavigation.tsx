import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNavigation } from "./BottomNavigation";
import JobDetailScreen from "src/screens/Job/JobDetails";
import { RootStackParamList } from "src/types";

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation = () => {

  return (
    <>
      {/* @ts-ignore */}
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: "#fff",
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontFamily: "HelveticaNeue-Black",
          },
          headerTintColor: "#006400",
        }}
      >
        <Stack.Screen
          name="BottomScreen"
          component={BottomNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="JobDetail"
          component={JobDetailScreen}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;
