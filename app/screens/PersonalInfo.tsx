import { loadString, saveString } from "app/utils/storage"
import * as Application from "expo-application"
import React, { ComponentType, FC, useMemo, useState } from "react"
import {
  GestureResponderEvent,
  Linking,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import {
  Button,
  ListItem,
  Screen,
  Text,
  TextField,
  Icon,
  TextFieldAccessoryProps,
} from "../components"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
import EDIT_ICON from "../../assets/icons/editar-texto.png"
import { useColor } from "app/theme/ColorProvider"
import AsyncStorage from "@react-native-async-storage/async-storage"

// function openLinkInBrowser(url: string) {
//   Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
// }

// console.log("USER NAME", userName);

export const DemoDebugScreen: FC<DemoTabScreenProps<"DemoDebug">> = function DemoDebugScreen(
  _props,
) {
  const [userNameState, setUserNameState] = useState<string | null>("")
  const [editState, setEditState] = useState(false)
  const [newEditedName, setNewEditedName] = useState("")
  const { colorsProvider, getColor } = useColor()

  const {
    authenticationStore: { logout },
  } = useStores()

  const savingNewNameInState = (value: React.SetStateAction<string>) => {
    setNewEditedName(value)
  }

  const saveNewUserName = async () => {
    await saveString("userName", newEditedName)
    setEditState(false)
  }

  const getUserName = async () => {
    const userName = await loadString("userName")
    setUserNameState(userName)
  }
  getUserName()

  const changeEditStatus = () => {
    setEditState(!editState)
  }

  const ColorPicker = () => {
    const [colors] = useState([
      "#FF6347", // Tomato
      "#4682B4", // Steel Blue
      "#6B8E23", // Lime Green
      "#FFC800", // Gold
      "#9370DB", // Blue Violet
      "#FFA500", // Orange
      // radnom
      "#FFC0CB",
      "#ADD8E6",
    ])

    const styles = {
      container: {
        // padding: 10,
        // backgroundColor: '#FFFFFF', // Background color for light theme
      },
      colorContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      },
      color: {
        width: 45,
        height: 45,
        borderRadius: 35,
        // borderWidth: 2,
        // borderColor: "black",
        margin: 4,
      },
    }

    return (
      <View style={styles.container}>
        {/* <Text style={styles.title}>Choose a Color:</Text> */}
        <View style={styles.colorContainer}>
          {colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.color,
                {
                  backgroundColor: color,
                  width: color === colorsProvider.palette.primary500 ? 55 : 45,
                  height: color === colorsProvider.palette.primary500 ? 55 : 45,
                },
              ]}
              onPress={() => {
                AsyncStorage.setItem("appColor", color)
                getColor(color)
              }} // Change this line
            />
          ))}
        </View>
      </View>
    )
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={"edit"}
            color={"black"}
            containerStyle={{ marginLeft: "-8%" }}
            size={35}
            onPress={() => changeEditStatus()}
          />
        )
      },
    [],
  )

  // const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null
  // @ts-expect-error
  const usingFabric = global.nativeFabricUIManager != null

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text style={$title} preset="heading" tx="demoDebugScreen.title" />
      <View style={$itemsContainer}>
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text tx="personalInfo.name" preset="bold" />
              {editState ? (
                <TextField
                  placeholderTx="demoDebugScreen.newNamePlaceHolder"
                  value={newEditedName}
                  onChangeText={(value) => savingNewNameInState(value)}
                />
              ) : (
                <Text>{userNameState}</Text>
              )}
            </View>
          }
          RightComponent={
            !editState ? (
              <PasswordRightAccessory
                style={undefined}
                status={undefined}
                multiline={false}
                editable={false}
              />
            ) : (
              <></>
            )
          }
        />

        {!editState && (
          <View>
            <ListItem
              LeftComponent={
                <View style={$item}>
                  <Text tx="personalInfo.chooseColor" preset="bold" />
                  <Text tx="personalInfo.colorHelp" />
                </View>
              }
            />
            <ColorPicker />
            <ListItem
              LeftComponent={
                <View style={$item}>
                  <Text preset="bold">App Version</Text>
                  <Text>{Application.nativeApplicationVersion}</Text>
                </View>
              }
            />
          </View>
        )}
      </View>
      {editState && (
        <View style={$buttonContainer}>
          <Button
            style={$button}
            tx={"common.cancel"}
            onPress={() => {
              setNewEditedName("")
              setEditState(false)
            }}
          />
        </View>
      )}

      {editState && (
        <View style={$buttonContainer}>
          <Button style={$button} tx={"common.save"} onPress={saveNewUserName} />
        </View>
      )}
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $containerTextField: ViewStyle = {
  width: "90%",
}

const $title: TextStyle = {
  marginBottom: spacing.xxl,
}

const $item: ViewStyle = {
  marginBottom: spacing.md,
  width: "100%",
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.xl,
}

const $button: ViewStyle = {
  marginBottom: spacing.xs,
}

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.xxxs,
}

const $hint: TextStyle = {
  color: colors.palette.neutral600,
  fontSize: 12,
  lineHeight: 15,
  paddingBottom: spacing.lg,
}
