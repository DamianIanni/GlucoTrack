import React from "react"
import { View, ViewStyle } from "react-native"
import { Text, Button, TextField, ListView } from "app/components"
import { colors, spacing } from "app/theme"

interface InputsAddValuesProps {
  // Add any props you might use in your component
}

const InputsAddValues: React.FC<InputsAddValuesProps> = () => {
  return (
    <View>
      <View style={$addValueContentView}>
        <ListView renderItem={ValueComponent} data={[
      'January', 'February', 'March', 'April', 'May', 
    ]} estimatedItemSize={10}/>
      </View>
    </View>
  )
}

export default InputsAddValues

const ValueComponent = () => {
  return (
    <View style={$addValueElementsView}>
      <View style={$inputTextView}>
      <Text tx="addValueScreen.inputsAddValues._time" style={$textNextToValue} />
      <TextField containerStyle={$textFieldForValue} />
      </View>
      <View style={$inputTextView}>
      <Text tx="addValueScreen.inputsAddValues._value" style={$textNextToValue} />
      <TextField containerStyle={$textFieldForValue} />
      </View>
    </View>
  )
}

const $addValueView: ViewStyle = {
  flexDirection: "row",
  margin: 4,
  marginBottom: 10,
  paddingTop: 4,
  // backgroundColor: "red",
  // justifyContent: "flex-end",
  justifyContent: "center",
  alignItems: "center",
}

const $addValueElementsView: ViewStyle = {
  flexDirection: "row",
  // margin: 4,
  paddingBottom: 10,
  // paddingLeft: 4,
  // backgroundColor: "pink",
  justifyContent: "space-around",
  alignItems: "center",
}
const $inputTextView: ViewStyle = {
  flexDirection: "row",
  // margin: 4,
  paddingBottom: 10,
  // paddingLeft: 4,
  // backgroundColor: "pink",
  justifyContent: "center",
  alignItems: "center",
}

const $addValueContentView: ViewStyle = {
  flexDirection: "column",
  // margin: 4,
  paddingTop: 10,
  paddingLeft: 4,
  height: "65%",
  // backgroundColor: "yellow",
  justifyContent: "flex-start",
  // alignItems: "center",
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

const $textNextToValue: ViewStyle = {
  marginRight: 4,
}

const $textFieldForValue: ViewStyle = {
  marginRight: 10,
  width: 70,
}

const $inputStyle: ViewStyle = {
  height: 30,
  // alignItems: "center",
  alignContent: "center",
}
