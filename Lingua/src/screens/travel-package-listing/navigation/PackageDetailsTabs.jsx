import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { PackageOverview } from "../PackageOverview"
import { PackageItinerary } from "../PackageItinerary"
import PackageTips from "../components/PackageTips"
const TopTab = createMaterialTopTabNavigator()

export default function PackageDetailsTabs({ packageDetails }) {
  return (
    <TopTab.Navigator>
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
      <TopTab.Screen
        name="Tips & Recommendations"
        component={PackageTips}
        initialParams={packageDetails}
      />

    </TopTab.Navigator>
  )
}
