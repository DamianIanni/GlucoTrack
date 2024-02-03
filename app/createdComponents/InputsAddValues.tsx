import React from "react"
import { View, ViewStyle } from "react-native"
import { Text, Button } from "app/components"
import { colors, spacing } from "app/theme"

interface InputsAddValuesProps {
  // Add any props you might use in your component
}

const InputsAddValues: React.FC<InputsAddValuesProps> = () => {
  return (
    <View>
      <View style={$addValueView}>
        {/* <Text
        size="md"
        tx="addValueScreen.inputsAddValues.add_value" /> */}
        <Button
        style={$buttonAddValue}
         tx="addValueScreen.inputsAddValues.add_value"
        />
      </View>
    </View>
  )
}

export default InputsAddValues

const $addValueView: ViewStyle = {
  flexDirection: "row",
  // margin: 4,
  paddingTop: 4,
  // backgroundColor: "red",
  justifyContent: "flex-end",
  alignItems: "center",
}

const $buttonAddValue: ViewStyle = {
  borderRadius: 17,
  // marginTop: spacing.xs,
  justifyContent: "flex-start",
  backgroundColor: colors.palette.neutral300,
  borderColor: colors.palette.neutral300,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xxxs,
  paddingBottom: 0,
  minHeight: 32,
  alignSelf: "flex-start",
}
