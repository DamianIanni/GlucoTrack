import React, { useState } from "react";
import useScreenDimensions from "app/utils/screenDimensions";
import { TextInput } from "react-native";
import { View } from "react-native";
import { Text, TextField, Icon, Button } from "app/components";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors, spacing } from "app/theme";



export const AddValuesComponent = (props) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateToUse, setDateToUse] = useState("")
    const [bloodSugar, setBloodSugar] = useState(0)
    const screenDimensions = useScreenDimensions()

    console.log("PROPS OF ADDING COMPONENT", props.cancelAction);

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
            // paddingHorizontal: spacing.lg
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
            // paddingHorizontal: spacing.lg,
            // backgroundColor: "red"
        },
        action_container: {
            flexDirection: "row",
            witdh: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 16,
            marginBottom: 16,
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
        const onlyTime = getTimeFromDate(date)
        setDateToUse(onlyTime)
        hideDatePicker();
    };

    function getTimeFromDate(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    function handleBloodSugarValue(value) {
        setBloodSugar(value)
    }

    function handleSave() {
        props.saveAction()
    }

    function handleCancel() {
        props.cancelAction()
    }

    const AddComp = () => {
        return (
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
                    <TextField inputMode="numeric" containerStyle={style.textFieldForValue} value={bloodSugar} onChange={(value) => handleBloodSugarValue(value)} />
                </View>
            </View>
        )
    }

    return (
        <View style={style.main_container}>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <AddComp />
            <View style={style.main_container_buttons}>
                <Button style={style.buttons} text="Save" onPress={() => handleSave()} />
                <Button style={style.buttons} text="Cancel" onPress={() => handleCancel()} />
            </View>
        </View>
    )
}
