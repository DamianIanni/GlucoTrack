import React from "react"
import { Header, Icon, Screen } from "../components"
import { ViewStyle } from "react-native"
import { goBack, navigate } from "app/navigators"
import { Calendar } from "react-native-calendars"
import InputsAddValues from "../createdComponents/InputsAddValues"

// Define the type for the component props (if any)
interface AddValuesScreenProps {
  route: any
}

const EmptyHeaderComponent = () => {
  return (
    <></>
  )
}

const AddValuesScreen: React.FC<AddValuesScreenProps> = (props) => {
  
  const month = props.route.params
  const parsedMonth = JSON.parse(month)
 
  const goBackToMonths = () => {
    // goBack()
    navigate("Demo")
    console.log("KAKAKKA");
    
  }

  function setDateToMonth(monthNumber: number) {
    // Get the current date
    let currentDate = new Date();
    // Set the month based on the input
    currentDate.setMonth(monthNumber); // Months are zero-indexed, so we subtract 1
    return currentDate;
  }

  function formatDate(inputDate: string | number | Date) {
    const dateObject = new Date(inputDate);
    
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    const day = String(dateObject.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  
  // Example usage:
  let modifiedDate = formatDate(new Date(setDateToMonth(parsedMonth.numberIndex)))
  console.log(modifiedDate);
  
  

  // Use 'React.ReactElement' as the return type for JSX components
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={[]}
      contentContainerStyle={$screenContentContainer}
    >
      <Header
        // style={{ backgroundColor: "lightblue" }}
        title={parsedMonth.episode.toUpperCase()}
        LeftActionComponent={
          <Icon style={{ marginLeft: 16 }} size={33} icon="back" onPress={() => goBackToMonths()} />
        }
      />
      <Calendar style={$calendarContainer} hideExtraDays initialDate={modifiedDate} hideArrows customHeaderTitle={<EmptyHeaderComponent/>}
      />
      <InputsAddValues/>
    </Screen>
  )
}

export default AddValuesScreen

const $screenContentContainer: ViewStyle = {
  flex: 1,
  paddingLeft: 4,
  paddingRight: 4
}

const $calendarContainer: ViewStyle = {
borderRadius: 5
}