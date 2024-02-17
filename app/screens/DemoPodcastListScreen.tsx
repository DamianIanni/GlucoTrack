import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo } from "react"
import {
  ImageSourcePropType,
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
import { useStores } from "../models"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
// import { delay } from "../utils/delay"
import {navigate} from "../navigators/navigationUtilities"
import { createMonths } from "app/realmModel/useRealmModels"

const ICON_SIZE = 14

const rnrImage1 = require("../../assets/images/demo/rnr-image-1.png")
const rnrImage2 = require("../../assets/images/demo/rnr-image-2.png")
const rnrImage3 = require("../../assets/images/demo/rnr-image-3.png")
const rnrImages = [rnrImage1, rnrImage2, rnrImage3]

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
  const imageUri = useMemo<ImageSourcePropType>(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  const moreFunction = () => {
    console.log("MORE")
  }

  const objDate = {
    monthName: monthName,
    numberIndex: `${numberIndex}`
  }

  /**
   * Android has a "longpress" accessibility action. iOS does not, so we just have to use a hint.
   * @see https://reactnative.dev/docs/accessibility#accessibilityactions
   */
  // const accessibilityHintProps = useMemo(
  //   () =>
  //     Platform.select<AccessibilityProps>({
  //       ios: {
  //         accessibilityLabel: episode.title,
  //         accessibilityHint: translate("demoPodcastListScreen.accessibility.cardHint", {
  //           action: isFavorite ? "unfavorite" : "favorite",
  //         }),
  //       },
  //       android: {
  //         accessibilityLabel: episode.title,
  //         accessibilityActions: [
  //           {
  //             name: "longpress",
  //             label: translate("demoPodcastListScreen.accessibility.favoriteAction"),
  //           },
  //         ],
  //         onAccessibilityAction: ({ nativeEvent }) => {
  //           if (nativeEvent.actionName === "longpress") {
  //             handlePressFavorite()
  //           }
  //         },
  //       },
  //     }),
  //   [episode, isFavorite],
  // )

  // const handlePressFavorite = () => {
  //   onPressFavorite()
  //   liked.value = withSpring(liked.value ? 0 : 1)
  // }

  const handlePressCard = () => {
    // console.log("LAS PROPS", JSON.stringify(props, null, 3));
    navigate("HandleValuesScreen", JSON.stringify(objDate))
  }

  // const ButtonLeftAccessory: ComponentType<ButtonAccessoryProps> = useMemo(
  //   () =>
  //     function ButtonLeftAccessory() {
  //       return (
  //         <View>
  //           <Animated.View
  //             style={[$iconContainer, StyleSheet.absoluteFill, animatedLikeButtonStyles]}
  //           >
  //             <Icon
  //               icon="heart"
  //               size={ICON_SIZE}
  //               color={colors.palette.neutral800} // dark grey
  //             />
  //           </Animated.View>
  //           <Animated.View style={[$iconContainer, animatedUnlikeButtonStyles]}>
  //             <Icon
  //               icon="heart"
  //               size={ICON_SIZE}
  //               color={colors.palette.primary400} // pink
  //             />
  //           </Animated.View>
  //         </View>
  //       )
  //     },
  //   [],
  // )

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
        <Button text="+More" onPress={() => moreFunction()} 
        style={$favoriteButton}/>
      }
      content={`Month average: ${monthName}`}
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
