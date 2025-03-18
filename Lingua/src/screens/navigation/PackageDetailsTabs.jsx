import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { PackageOverview } from "../travel-package-listing/PackageOverview"
import { PackageItinerary } from "../travel-package-listing/PackageItinerary"

const TopTab = createMaterialTopTabNavigator()

export default function PackageDetailsTabs({ packageDetails }) {
  return (
    <TopTab.Navigator
      initialRouteName="Overview"
      screenOptions={{
        lazy: false,
      }}
    >
      <TopTab.Screen
        name="Overview"
        component={PackageOverview}
        initialParams={packageDetails}
      />
      <TopTab.Screen
        name="Itinerary"
        component={PackageItinerary}
        initialParams={packageDetails}
      />
    </TopTab.Navigator>
  )
}
