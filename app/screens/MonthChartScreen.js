import React, { useState } from "react";
import useScreenDimensions from "app/utils/screenDimensions";
import { View, Text } from "react-native";
import { Screen, Header, Icon } from "app/components";
import { LineChart } from "react-native-chart-kit";
import { goBack, navigate } from "app/navigators"
import { colors, spacing } from "app/theme";
import { getAverageOfTheMonth } from "app/realmModel/useRealmModels";

const chartConfig = {
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.background,
    color: (opacity = 1) => `black`,
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
};

const roundedData = [
    319, 288, 97, 213, 256, 68, 125, 178, 351, 282,
    295, 389, 294, 367, 150, 75, 76, 275, 226, 336,
    319, 110, 318, 385, 210, 114, 231, 131, 102, 221
].map(Math.round);

export const MonthChartScreen = (props) => {
    const parsedMonth = JSON.parse(props.route.params)
    const screenDimensions = useScreenDimensions()
    const [valueSelected, setValueSelected] = useState("")
    const objDataToChart = getAverageOfTheMonth("day" ,parsedMonth.monthName)
    // console.log("AVERAGEEEE", JSON.stringify(objDataToChart, null, 2));
    const style = {
        screen_container: {
            flex: 1,
            paddingHorizontal: spacing.xs,
            // backgroundColor: "lightblue"
        },
        chart_container: {
            // flex: 1,
            // backgroundColor: "yellow",
            height: screenDimensions.width,
            width: screenDimensions.height * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ rotate: '90deg' }],
            top: (screenDimensions.width * 0.45),
            left: -(screenDimensions.width * 0.55),
        },
    }

    function goBackToMonths() {
        navigate("Demo")
    }

    return (
        <Screen preset="fixed" safeAreaEdges={[]} style={style.screen_container}>
            <Header title={parsedMonth.monthName.toUpperCase()}
                LeftActionComponent={<Icon size={33} icon="back" onPress={() => goBackToMonths()} />}
                style={{
                    marginLeft: spacing.md,
                }}
            />
            {valueSelected && <Text style={{ alignSelf: 'center', fontSize: 17, marginBottom: -5 }}>Average day value: <Text style={{ color: "orange", fontWeight: "bold" }}>{valueSelected}</Text> </Text>}
            <View style={style.chart_container}>
                <LineChart
                    data={{
                        labels: objDataToChart.arrOfDayNumber,
                        datasets: [
                            {
                                data: objDataToChart.arrOfAverages
                            }
                        ]
                    }}
                    width={screenDimensions.height * 0.9} // from react-native
                    height={screenDimensions.width}
                    yAxisInterval={6.5} // optional, defaults to 1
                    chartConfig={chartConfig}
                    withHorizontalLines={false}
                    withHorizontalLabels={'X-axis Label'}
                    formatYLabel={(value) => Math.round(value).toString()}
                    onDataPointClick={({ value }) => { setValueSelected(value) }}
                    fromZero={true}
                    getDotColor={() => { return "orange" }}
                    segments={5}
                    // renderDotContent={(x, y, index, indexData) => {
                    //     console.log(x);
                    //     return(
                    //     <View style={{ position: 'absolute', left: x.x + 15, top: x.y - 10, flexDirection: "row" }}>
                    //     <Text style={{ color: 'black', fontWeight: 'bold' }}>
                    //       {x.indexData}
                    //     </Text>
                    //   </View>
                    //     )
                    // }}
                    // withInnerLines={false}
                    // withOuterLines={true}
                    // bezier
                    style={{
                        borderRadius: 16,
                        backgroundColor: colors.background,
                        marginBottom: 10
                    }}
                />
            </View>

        </Screen >
    )
}