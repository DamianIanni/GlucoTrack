import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import {
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { type ContentStyle } from "@shopify/flash-list"

import {
  Button,
  Card,
  ListView,
  Screen,
  Text,
} from "../components"
import { isRTL, translate } from "../i18n"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
// import { delay } from "../utils/delay"
import {navigate} from "../navigators/navigationUtilities"
import { createMonths, getAverageOfTheMonth } from "app/realmModel/useRealmModels"

const ICON_SIZE = 14

export const DemoPodcastListScreen: FC<DemoTabScreenProps<"DemoPodcastList">> = observer(
  function DemoPodcastListScreen(_props) {
    const monthsArray = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    
    createMonths(monthsArray)

    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$screenContentContainer}
      >
        <ListView<string>
          contentContainerStyle={$listContentContainer}
          data={monthsArray}
          estimatedItemSize={177}
          ListHeaderComponent={
            <View style={$heading}>
              <Text preset="heading" tx="demoPodcastListScreen.title" />
            </View>
          }
          renderItem={({ item, index }) => (
            <EpisodeCard
              monthName={item}
              numberIndex={index}
            />
          )}
        />
      </Screen>
    )
  },
)

const EpisodeCard = observer(function EpisodeCard({
  monthName,
  numberIndex
}:
{
  monthName: string,
  numberIndex: any
}) {

  const averageToShow = (getAverageOfTheMonth("month", monthName))
  // console.log("TO SHOW", averageToShow);

  const objDate = {
    monthName: monthName,
    numberIndex: `${numberIndex}`
  }

  const moreFunction = () => {
    navigate("MonthChartScreen", JSON.stringify(objDate))
  }

  const handlePressCard = () => {
    navigate("HandleValuesScreen", JSON.stringify(objDate))
  }

  return (
    <Card
      style={$item}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      HeadingComponent={
        <View style={$metadata}>
          <Text
            style={$metadataText}
            size="xl"
          >
            {monthName}
          </Text>
        </View>
      }
      RightComponent={
        <Button text="Chart" onPress={() => moreFunction()} 
        style={$favoriteButton}/>
      }
      content={`Month average: ${averageToShow ? Math.round(averageToShow) : "No values" }`}
    />
  )
})

// #region Styles
const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
}

const $heading: ViewStyle = {
  marginBottom: spacing.md,
}

const $item: ViewStyle = {
  padding: spacing.md,
  marginTop: spacing.md,
  minHeight: 120,
}

const $itemThumbnail: ImageStyle = {
  marginTop: spacing.sm,
  borderRadius: 50,
  alignSelf: "flex-start",
}

const $toggle: ViewStyle = {
  marginTop: spacing.md,
}

const $labelStyle: TextStyle = {
  textAlign: "left",
}

const $iconContainer: ViewStyle = {
  height: ICON_SIZE,
  width: ICON_SIZE,
  flexDirection: "row",
  marginEnd: spacing.sm,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  marginTop: spacing.xs,
  flexDirection: "row",
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
  fontWeight: "bold"
}

const $favoriteButton: ViewStyle = {
  borderRadius: 17,
  marginTop: spacing.xs,
  justifyContent: "flex-start",
  backgroundColor: colors.palette.primary500,
  borderColor: colors.palette.primary500,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xxxs,
  paddingBottom: 0,
  minHeight: 32,
  alignSelf: "flex-start",
}

const $unFavoriteButton: ViewStyle = {
  borderColor: colors.palette.primary100,
  backgroundColor: colors.palette.primary100,
}

const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}
// #endregion
