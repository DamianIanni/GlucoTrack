import React, { useState } from "react";
import { CombinedButtons } from "./CombinedButtons";
import useScreenDimensions from "app/utils/screenDimensions";
import { TextInput } from "react-native";
import { View } from "react-native";
import { Text, TextField, Icon } from "app/components";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors } from "app/theme";



export const AddValuesComponent = (props) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateToUse, setDateToUse] = useState("")
    const [bloodSugar, setBloodSugar] = useState(0)
    const screenDimensions = useScreenDimensions()

    const style = {
        main_container: {
            backgroundColor: "white",
            borderRadius: 10,
            height: screenDimensions.height * 0.22,
            width: "100%",
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center"
        },
        inputTextView: {
            flexDirection: "column",
            // paddingBottom: 10,
            justifyContent: "center",
            alignItems: "center",
        },
        textNextToValue: {
            marginRight: 4,
            // color: "orange",
            fontWeight: "bold"
        },
        textFieldForValue: {
            marginRight: 10,
            width: 70,
        },
        addValueElementsView: {
            flexDirection: "column",
            paddingBottom: 10,
            justifyContent: "flex-start",
            alignItems: "flex-start",
        },
        action_container: {
            flexDirection: "row",
            witdh: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 16,
            marginBottom: 16
            // backgroundColor: "red"
        }
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const onlyTime = getTimeFromDate(date)
        setDateToUse(onlyTime)
        hideDatePicker();
    };

    function getTimeFromDate(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    const handleBloodSugarValue = (value) => {
        setBloodSugar(value)
    }
 
    return (
        <View style={style.main_container}>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <View style={style.addValueElementsView}>
                <View style={style.inputTextView}>
                    <Text tx="addValueScreen.inputsAddValues._time" style={style.textNextToValue} />
                </View>
                <View style={style.inputTextView}>
                    <Text tx="addValueScreen.inputsAddValues._value" style={style.textNextToValue} />
                </View>
                <View style={style.action_container}>
                    <Icon style={{ marginRight: 16 }} size={33} icon="clock" onPress={() => showDatePicker()} />
                    <Text text="Time" size="md" style={{
                        ...style.textNextToValue,
                        marginRight: 8
                    }} />
                    <Text text={dateToUse} size="md" style={{
                        ...style.textNextToValue,
                        color: "orange",
                        marginRight: 16
                    }} />
                    <TextField inputMode="numeric" containerStyle={style.textFieldForValue} value={bloodSugar} onChange={(value) => handleBloodSugarValue(value)}/>
                </View>
            </View>
            <CombinedButtons cancelAction={() => props.cancelAction()} />
        </View>
    )
}
