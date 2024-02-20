import React, { useState } from "react";
import useScreenDimensions from "app/utils/screenDimensions";
import { View, TextInput } from "react-native";
import { Text, TextField, Icon, Button } from "app/components";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors, spacing } from "app/theme";
import getHoursFromDate from "app/utils/mineFormatDate";


export const AddValuesComponent = (props) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateToUse, setDateToUse] = useState(props.indexToEdit != null ? getHoursFromDate(props.day.registers[props.indexToEdit].time) : "")
    const [bloodSugar, setBloodSugar] = useState(props.indexToEdit != null ? props.day.registers[props.indexToEdit].value + "" : "")
    const [rawDate, setRawDate] = useState(props.indexToEdit != null ? props.day.registers[props.indexToEdit].time : null)
    const screenDimensions = useScreenDimensions()

    // console.log("PROPS OF ADDING COMPONENT", JSON.stringify(props.indexToEdit != null && props.day.registers[props.indexToEdit].time, null, 3));
    // console.log("PROPS OF ADDING COMPONENT", JSON.stringify(props, null, 3));
    const style = {
        main_container: {
            backgroundColor: "white",
            borderRadius: 10,
            height: screenDimensions.height * 0.22,
            width: "100%",
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
            borderColor: colors.background,
            borderWidth: 1,
            elevation: 1
        },
        inputTextView: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        textNextToValue: {
            // marginRight: 4,
            fontWeight: "bold"
        },
        textFieldForValue: {
            // marginRight: 10,
            width: 55,
        },
        addValueElementsView: {
            flexDirection: "column",
            // paddingBottom: 10,
            width: screenDimensions.width * 0.55,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginBottom: 10
            // backgroundColor: "pink"
        },
        action_container: {
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            // marginTop: 16,
            marginBottom: 10,
            // backgroundColor: "red"
        },
        main_container_buttons: {
            width: "70%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around"
        },
        buttons: {
            borderRadius: 22,
            backgroundColor: colors.palette.primary500,
            borderColor: colors.palette.primary500,
            paddingHorizontal: spacing.md,
            paddingTop: spacing.xxxs,
            paddingBottom: 0,
            minHeight: 32,
            alignSelf: "center",
            justifyContent: "center",
            width: 110
        }
    }

    function showDatePicker() {
        setDatePickerVisibility(true);
    };

    function hideDatePicker() {
        setDatePickerVisibility(false);
    };

    function handleConfirm(date) {
        setRawDate(date)
        const onlyTime = getTimeFromDate(date)
        setDateToUse(onlyTime)
        hideDatePicker();
    };

    function getTimeFromDate(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const time = `${hours}:${minutes}`
        return time;
    }

    function handleBloodSugarValue(value) {
        setBloodSugar(value)
    }

    function backToEmpty() {
        setDateToUse("")
        setBloodSugar("")
        setRawDate(null)
    }

    function handleSave() {
        const data = {
            time: rawDate,
            value: parseInt(bloodSugar)
        }
        props.saveAction(data)
        backToEmpty()
    }

    function handleCancel() {
        backToEmpty()
        props.cancelAction()
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
                {/* <View style={style.inputTextView}>
                    <Text tx="addValueScreen.inputsAddValues._time" style={style.textNextToValue} />
                </View>
                <View style={style.inputTextView}>
                    <Text tx="addValueScreen.inputsAddValues._value" style={style.textNextToValue} />
                </View> */}
                {/* <View style={style.action_container}> */}
                <View style={{
                    ...style.action_container,
                    flexDirection: "row",
                }}>
                    <Text text="Select a " size="md" style={{
                        ...style.textNextToValue,
                        fontWeight: "normal"
                    }} />
                    <Text text="Time: " size="md" onPress={() => showDatePicker()} style={{
                        ...style.textNextToValue,
                        fontWeight: "bold",
                        color: "orange"
                    }} />
                    {/* <Icon style={{ marginRight: 8 }} size={33} icon="clock" onPress={() => showDatePicker()} /> */}
                    <Text text={dateToUse} size="md" style={{
                        ...style.textNextToValue,
                    }} />
                </View>
                <View style={{
                    ...style.action_container,
                    flexDirection: "row",
                    witdh: "100%",
                }}>
                    <Text text="Enter a value: " size="md" style={{
                        ...style.textNextToValue,
                        fontWeight: "normal"
                    }} />
                    <TextField inputMode="numeric" maxLength={3} containerStyle={style.textFieldForValue} placeholder={bloodSugar} value={bloodSugar} onChangeText={(text) => handleBloodSugarValue(text)} />
                    {/* </View> */}
                </View>
            </View>
            <View style={style.main_container_buttons}>
                <Button style={{
                    ...style.buttons, backgroundColor: (!bloodSugar || bloodSugar.length < 2 || !dateToUse) ? "lightgray" : colors.palette.primary500,
                    borderColor: (!bloodSugar || bloodSugar.length < 2 || !dateToUse) ? "lightgray" : colors.palette.primary500,
                    opacity: (!bloodSugar || bloodSugar.length < 2 || !dateToUse) ? 0.5 : 1,
                }} text="Save" disabled={!bloodSugar || !dateToUse} onPress={() => handleSave()} />
                <Button style={style.buttons} text="Cancel" onPress={() => handleCancel()} />
            </View>
        </View>
    )
}
