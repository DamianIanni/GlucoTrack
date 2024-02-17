import { loadString, saveString } from "app/utils/storage"
import * as Application from "expo-application"
import React, { ComponentType, FC, useMemo, useState } from "react"
import { Linking, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
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

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={"edit"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
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

  // const demoReactotron = React.useMemo(
  //   () => async () => {
  //     if (__DEV__) {
  //       console.tron.display({
  //         name: "DISPLAY",
  //         value: {
  //           appId: Application.applicationId,
  //           appName: Application.applicationName,
  //           appVersion: Application.nativeApplicationVersion,
  //           appBuildVersion: Application.nativeBuildVersion,
  //           hermesEnabled: usingHermes,
  //         },
  //         important: true,
  //       })
  //     }
  //   },
  //   [],
  // )

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text style={$title} preset="heading" tx="demoDebugScreen.title" />
      <View style={$itemsContainer}>
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Name</Text>
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
            ) : undefined
          }
        />

        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Version</Text>
              <Text>{Application.nativeApplicationVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Build Version</Text>
              <Text>{Application.nativeBuildVersion}</Text>
            </View>
          }
        />
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

const $reportBugsLink: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.lg,
  alignSelf: isRTL ? "flex-start" : "flex-end",
}

const $item: ViewStyle = {
  marginBottom: spacing.md,
  width: "90%",
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
