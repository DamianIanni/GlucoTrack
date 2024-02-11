import React, { useState } from "react"
import { Header, Icon, Screen, Button } from "../components"
import { View, ViewStyle } from "react-native"
import { goBack, navigate } from "app/navigators"
import { Calendar } from "react-native-calendars"
import InputsAddValues from "../createdComponents/ShowValues"
import { logMonthDetails } from "../realmModel/useRealmModels"
import { colors, spacing } from "app/theme"
import { AddValuesComponent } from "app/createdComponents/AddValueComponent"

// Define the type for the component props (if any)
interface AddValuesScreenProps {
  route: any
}

const EmptyHeaderComponent = () => {
  return <></>
}

const AddValuesScreen: React.FC<AddValuesScreenProps> = (props) => {
  const month = props.route.params
  const parsedMonth = JSON.parse(month)
  const dateToUse = new Date(setDateToMonth(parsedMonth.numberIndex))
  const [addingValue, setAddingValue] = useState(false)
  // logMonthDetails(parsedMonth.monthName)

  const AddValueComponent = () => {
    // tx="addValueScreen.inputsAddValues.add_value"
    return (
      <View style={$addValueView}>
        <Button style={$buttonAddValue} text="+Value" onPress={() => setAddingValue(true)} />
      </View>
    )
  }

  const goBackToMonths = () => {
    navigate("Demo")
  }

  function setDateToMonth(monthNumber: number) {
    // Get the current date
    let currentDate = new Date()
    // Set the month based on the input
    currentDate.setMonth(monthNumber) // Months are zero-indexed, so we subtract 1
    return currentDate
  }

  function formatDate(inputDate: string | number | Date) {
    const dateObject = new Date(inputDate)

    const year = dateObject.getFullYear()
    const month = String(dateObject.getMonth() + 1).padStart(2, "0") // Months are zero-indexed, so add 1
    const day = String(dateObject.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
  }

  function cancelAction() {
    console.log("PARENT LOG");
    setAddingValue(false)
  }

  return (
    <Screen preset="fixed" safeAreaEdges={[]} contentContainerStyle={$screenContentContainer}>
      <Header
        title={parsedMonth.monthName.toUpperCase()}
        LeftActionComponent={
          <Icon style={{ marginLeft: 16 }} size={33} icon="back" onPress={() => goBackToMonths()} />
        }
        RightActionComponent={!addingValue ? <AddValueComponent /> : <EmptyHeaderComponent/>}
      />
      <Calendar
        style={$calendarContainer}
        hideExtraDays
        initialDate={formatDate(dateToUse)}
        hideArrows
        customHeaderTitle={<EmptyHeaderComponent />}
      />
      {!addingValue ? <InputsAddValues /> : <AddValuesComponent cancelAction={() => cancelAction()} />}
    </Screen>
  )
}

export default AddValuesScreen

const $screenContentContainer: ViewStyle = {
  flex: 1,
  paddingLeft: 4,
  paddingRight: 4,
}

const $calendarContainer: ViewStyle = {
  borderRadius: 5,
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

const $buttonAddValue: ViewStyle = {
  borderRadius: 17,
  // marginTop: spacing.xs,
  justifyContent: "flex-start",
  backgroundColor: colors.palette.primary500,
  borderColor: colors.palette.primary500,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xxxs,
  paddingBottom: 0,
  minHeight: 32,
  alignSelf: "flex-start",
}
