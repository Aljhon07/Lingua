import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { PackageOverview } from "../travel-package-listing/components/PackageOverview"
import { PackageItinerary } from "../travel-package-listing/components/PackageItinerary"
import { View } from "react-native"

const Tab = createMaterialTopTabNavigator()

export default function PackageDetailsTabs({ packageDetails }) {
  return (
    <Tab.Navigator initialRouteName="Overview">
      <Tab.Screen
        name="Overview"
        component={PackageOverview}
        initialParams={packageDetails}
      />
      <Tab.Screen
        name="Itinerary"
        component={PackageItinerary}
        initialParams={packageDetails}
      />
    </Tab.Navigator>
  )
}
