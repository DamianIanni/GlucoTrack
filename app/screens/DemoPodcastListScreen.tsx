import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { type ContentStyle } from "@shopify/flash-list"

import { Button, Card, ListView, Screen, Text } from "../components"
import { isRTL, translate } from "../i18n"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
// import { delay } from "../utils/delay"
import { navigate } from "../navigators/navigationUtilities"
import { createMonths, getAverageOfTheMonth } from "app/realmModel/useRealmModels"
import { useColor } from "app/theme/ColorProvider"

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
          renderItem={({ item, index }) => <EpisodeCard monthName={item} numberIndex={index} />}
        />
      </Screen>
    )
  },
)

const EpisodeCard = observer(function EpisodeCard({
  monthName,
  numberIndex,
}: {
  monthName: string
  numberIndex: any
}) {
  const averageToShow = getAverageOfTheMonth("month", monthName)
  const { colorsProvider } = useColor()
  // console.log("TO SHOW", averageToShow);

  const objDate = {
    monthName: monthName,
    numberIndex: `${numberIndex}`,
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
          <Text style={$metadataText} size="xl">
            {monthName}
          </Text>
        </View>
      }
      RightComponent={
        <Button
          tx="demoPodcastListScreen.chart"
          onPress={() => moreFunction()}
          style={{
            ...$favoriteButton,
            backgroundColor: colorsProvider.palette.primary500,
            borderColor: colorsProvider.palette.primary500,
          }}
        />
      }
      content={
        <Text>
          <Text tx="demoPodcastListScreen.monthAverage" />
          {averageToShow ? (
            <Text style={{ fontWeight: "bold", color: colorsProvider.palette.primary500 }}>
              {Math.round(averageToShow)} mg/dL
            </Text>
          ) : (
            <Text tx="demoPodcastListScreen.noValues" />
          )}
        </Text>
      }
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

const $metadata: TextStyle = {
  color: colors.textDim,
  marginTop: spacing.xs,
  flexDirection: "row",
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
  fontWeight: "bold",
}

const $favoriteButton: ViewStyle = {
  borderRadius: 17,
  marginTop: spacing.xs,
  justifyContent: "flex-start",
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xxxs,
  paddingBottom: 0,
  minHeight: 32,
  alignSelf: "flex-start",
}
// #endregion
