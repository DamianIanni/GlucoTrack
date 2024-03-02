import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text, ListView, Icon } from "app/components"
import { colors, spacing } from "app/theme"
import { ContentStyle } from "@shopify/flash-list"
import getHoursFromDate from "app/utils/mineFormatDate"
import { useColor } from "app/theme/ColorProvider"

interface ShowValues {
  // Add any props you might use in your component
  changeEditState: any
  registersOfTheDay: any
  actualMonth: any
  deleteAction: any
}

const ShowValues: React.FC<ShowValues> = (props) => {
  const changeEditState = props.changeEditState
  const deleteAction = props.deleteAction
  const { colorsProvider } = useColor()

  const ValueComponent = (props: any) => {
    const numberOFValue = props.index
    const bloodSugarValue = props.item?.value
    const time = getHoursFromDate(props.item?.time)

    function handleDelete() {
      deleteAction(numberOFValue)
    }

    function handleEdit() {
      changeEditState(numberOFValue)
    }

    return (
      <View style={$addValueElementsView}>
        <View
          style={{
            ...$allContainer,
            // backgroundColor: `${colorsProvider.palette.primary500}80`,
            // borderColor: `${colorsProvider.palette.primary500}4D`,
            // shadowColor: `${colorsProvider.palette.primary500}4D`,
          }}
        >
          <View style={{...$inputTextView, borderRightColor: colorsProvider.palette.primary500}}>
            <Text size={"lg"} style={$textNextToValue}>
              <Text size={"lg"} style={{ fontWeight: "bold" }}>
                {numberOFValue + 1}-
              </Text>
              {"  "}
              <Text
                size={"lg"}
                style={{ ...$highlightedText, color: colorsProvider.palette.primary500 }}
              >
                {bloodSugarValue}
              </Text>
              <Text style={{color: colorsProvider.palette.primary500, fontWeight: "bold"}}> mg/dL  </Text>
              <Text tx="addValueScreen.inputsAddValues.actualValueText" />{" "}
              <Text
                size={"lg"}
                style={{ ...$highlightedText, color: colorsProvider.palette.primary500 }}
              >
                {time}
              </Text>
            </Text>
          </View>
          <View style={$buttonsContainer}>
            <Icon icon={"edit"} size={24} onPress={() => handleEdit()} />
            <Icon icon={"bin"} size={26} onPress={() => handleDelete()} />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View>
      {props.actualMonth ? (
        <View style={$addValueContentView}>
          {props.registersOfTheDay?.registers?.length > 0 ? (
            <ListView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={$listContentContainer}
              renderItem={ValueComponent}
              data={props.registersOfTheDay.registers}
              estimatedItemSize={10}
            />
          ) : (
            <View style={$noRegistersContainer}>
              <Text
                style={{ ...$noRegistersText, color: colorsProvider.palette.primary500 }}
                tx="showValuesScreen.noRegister"
              />
            </View>
          )}
        </View>
      ) : (
        <View style={$addValueContentView}>
          <View style={$noRegistersContainer}>
            <Text
              style={{ ...$noRegistersText, color: colorsProvider.palette.primary500 }}
              tx="showValuesScreen.selectADay"
            />
          </View>
        </View>
      )}
    </View>
  )
}

export default ShowValues

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.xxxs,
  // paddingTop: spacing.lg,
  paddingBottom: spacing.xs,
}

const $allContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  backgroundColor: "white",
  marginBottom: 8,
  marginTop: 8,
  borderRadius: 10,
  // Shadow effects
  borderWidth: 1,
  borderColor: colors.background,
  shadowColor: colors.palette.neutral800,
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.08,
  shadowRadius: 12.81,
  elevation: 1,
}

const $noRegistersContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  padding: 4,
  marginTop: spacing.lg,
}

const $noRegistersText: TextStyle = {
  fontSize: 24,
}

const $buttonsContainer: ViewStyle = {
  flexDirection: "row",
  // marginTop: 2,
  // marginBottom: 2,
  paddingHorizontal: spacing.xs,
  // paddingLeft: spacing.xxxl + spacing.md,
  // backgroundColor: "lightblue",
  justifyContent: "space-around",
  alignItems: "center",
  height: 56,
  width: "30%",
}

const $highlightedText: TextStyle = {
  fontWeight: "bold",
}

const $addValueElementsView: ViewStyle = {
  flexDirection: "row",
  // backgroundColor: "pink",
  justifyContent: "flex-start",
  alignItems: "center",
}

const $inputTextView: ViewStyle = {
  flexDirection: "row",
  paddingTop: "2%",
  // marginBottom: 2,
  // backgroundColor: "violet",
  justifyContent: "center",
  alignItems: "center",
  height: 56,
  width: "70%",
  borderRightWidth: 4,
  
}

const $addValueContentView: ViewStyle = {
  flexDirection: "column",
  marginTop: 10,
  height: "75%",
  justifyContent: "flex-start",
  paddingBottom: spacing.xs,
  // paddingHorizontal: spacing.lg
  // backgroundColor: "red"
}

const $textNextToValue: ViewStyle = {}
