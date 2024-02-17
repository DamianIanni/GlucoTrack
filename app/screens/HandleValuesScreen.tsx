import React, { useEffect, useState } from "react"
import { Header, Icon, Screen, Button } from "../components"
import { View, ViewStyle } from "react-native"
import { goBack, navigate } from "app/navigators"
import { Calendar } from "react-native-calendars"
import ShowValues from "../createdComponents/ShowValues"
import { logMonthDetails, getMonth, getSelectedDay } from "../realmModel/useRealmModels"
import { colors, spacing } from "app/theme"
import { AddValuesComponent } from "app/createdComponents/AddValueComponent"

// Define the type for the component props (if any)
interface HandleValuesScreen {
  route: any
}

const HandleValuesScreen: React.FC<HandleValuesScreen> = (props) => {
  const month = props.route.params
  const parsedMonth = JSON.parse(month)
  const dateToUse = new Date(setDateToMonth(parsedMonth.numberIndex))
  const [addingValue, setAddingValue] = useState(false)
  const [editValue, setEditValue] = useState(false)
  const [selectedDay, setSelectedDay] = useState(returnSelectedDay())
  const [registersOfTheDay, setRegistersOfTheDay] = useState(registersOfDayAsComponentMount())
  const [inActualMonth, setInActualMonth] = useState(isActualMonth())
  // logMonthDetails(parsedMonth.monthName)
  const mockedMonth = getMonth()

  const AddValueComponent = () => {
    // tx="addValueScreen.inputsAddValues.add_value"
    return (
      <View style={$addValueView}>
        {inActualMonth && (
          <Button
            style={$buttonAddValue}
            text="+Value"
            onPress={() => setAddingValue(true)}
            disabled={!inActualMonth}
          />
        )}
      </View>
    )
  }

  function goBackToMonths() {
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
    if (editValue) {
      setEditValue(false)
    }
    setAddingValue(false)
  }

  function saveAction() {}

  function changeEditState() {
    setEditValue(true)
    setAddingValue(true)
  }

  function isActualMonth() {
    const actualMonth = new Date().getMonth()
    const selectedMonth = dateToUse.getMonth()
    if (actualMonth != selectedMonth) return false
    return true
  }

  function returnSelectedDay() {
    const actualDate = new Date()
    if (dateToUse != actualDate) {
      return formatDate(actualDate)
    }
    return formatDate(dateToUse)
  }

  function handleSelectedDay(day: number, dateString: string) {
    const _dateString = dateString
    const _day = day
    setSelectedDay(_dateString)
    try {
      const daySelectedData = getSelectedDay(parsedMonth.monthName, _day)
      setRegistersOfTheDay(daySelectedData)
      // console.log("MES SELECCIONADO", daySelectedData)
    } catch (error) {
      console.log("ERROR PRINTING IN THE CONSOLE THE MONTH DATA", error)
    }
  }

  function registersOfDayAsComponentMount() {
    const day = new Date().getDate()
    const dayRegisters = getSelectedDay(parsedMonth.monthName, day)
    return dayRegisters
  }

  return (
    <Screen preset="fixed" safeAreaEdges={[]} contentContainerStyle={$screenContentContainer}>
      <Header
        title={parsedMonth.monthName.toUpperCase()}
        LeftActionComponent={<Icon size={33} icon="back" onPress={() => goBackToMonths()} />}
        RightActionComponent={!addingValue ? <AddValueComponent /> : <></>}
      />
      <Calendar
        style={$calendarContainer}
        hideExtraDays
        initialDate={formatDate(dateToUse)}
        hideArrows
        customHeaderTitle={<></>}
        markingType={"custom"}
        markedDates={{
          [selectedDay]: {
            customStyles: {
              container: {
                backgroundColor: "orange",
              },
              text: {
                color: "black",
                fontWeight: "bold",
              },
            },
          },
        }}
        onDayPress={(day) => {
          setInActualMonth(true)
          handleSelectedDay(day.day, day.dateString)
        }}
      />
      {!addingValue ? (
        <ShowValues
          changeEditState={() => changeEditState()}
          registersOfTheDay={registersOfTheDay}
          actualMonth={inActualMonth}
        />
      ) : (
        <AddValuesComponent
          onEdit={editValue}
          cancelAction={() => cancelAction()}
          saveAction={() => saveAction()}
          month={mockedMonth}
        />
      )}
    </Screen>
  )
}

export default HandleValuesScreen

const $screenContentContainer: ViewStyle = {
  flex: 1,
  // paddingLeft: 4,
  // paddingRight: 4,
  paddingHorizontal: spacing.lg,
}

const $calendarContainer: ViewStyle = {
  borderRadius: 10,
  // backgroundColor: "darkgrey",
  paddingBottom: 10,
  borderColor: colors.background,
  borderWidth: 1,
  elevation: 1,
  // height: 100
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
  backgroundColor: colors.palette.primary500,
  borderColor: colors.palette.primary500,
  borderRadius: 17,
  // marginTop: spacing.xs,
  justifyContent: "flex-start",
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xxxs,
  paddingBottom: 0,
  minHeight: 32,
  alignSelf: "flex-start",
}
