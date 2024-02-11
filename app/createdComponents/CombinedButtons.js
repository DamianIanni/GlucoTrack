import React from "react";
import useScreenDimensions from "app/utils/screenDimensions";
import { colors, spacing } from "app/theme";
import { View } from "react-native";
import { Button } from "app/components";

export const CombinedButtons = ({cancelAction, saveAction}) => {
const screenDimensions = useScreenDimensions()

const style = {
    main_container: {
        // height: screenDimensions * 0.1,
        width: "70%",
        // backgroundColor: colors.background,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    buttons: {
        borderRadius: 22,
        // marginTop: spacing.xs,
        // justifyContent: "flex-start",
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

const handleSave = () => {

}

const handleCancel = () => {
    cancelAction()
}

    return(
        <View style={style.main_container}>
            <Button style={style.buttons} text="Save" onPress={() => handleSave()}/>
            <Button style={style.buttons} text="Cancel" onPress={() => handleCancel()}/>
        </View>
    )
}