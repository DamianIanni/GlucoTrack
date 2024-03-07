import React, { useState, useEffect } from "react";
import useScreenDimensions from "app/utils/screenDimensions";
import { Screen, Header, Icon, Text } from "app/components";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { goBack, navigate } from "app/navigators"
import { colors, spacing } from "app/theme";
import { getAverageOfTheMonth } from "app/realmModel/useRealmModels";
import { useColor } from "app/theme/ColorProvider";
import Animated, { useSharedValue, withSpring, withTiming, Easing, withRepeat, useAnimatedStyle } from 'react-native-reanimated';

const chartConfig = {
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.background,
    color: (opacity = 1) => colors.black,
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
};

const duration = 1500;
// const easing = Easing.bezier(0.25, -0.5, 0.25, 1);
const easing = Easing.linear;


export const MonthChartScreen = (props) => {
    const parsedMonth = JSON.parse(props.route.params)
    const screenDimensions = useScreenDimensions()
    const [valueSelected, setValueSelected] = useState("Select a dot")
    const [dotSelected, setDotSelected] = useState(null)
    const [showChart, setShowChart] = useState(false);
    const objDataToChart = getAverageOfTheMonth("day", parsedMonth.monthName)
    const { colorsProvider } = useColor();
    // console.log("AVERAGEEEE", JSON.stringify(objDataToChart, null, 2));
    const width = useSharedValue(100)
    const opacity = useSharedValue(0);
    const sv = useSharedValue(0);

    const fadeIn = () => {
        width.value = withSpring(1, {}, () => {
        opacity.value = withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) });
        });
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${sv.value * 720}deg` }],
    }));

    const style = {
        screen_container: {
            flex: 1,
            paddingHorizontal: spacing.xs,
        },
        chart_container: {
            height: screenDimensions.width,
            width: screenDimensions.height * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ rotate: '90deg' }],
            top: (screenDimensions.width * 0.45),
            left: -(screenDimensions.width * 0.55),
        },
        loader_container: {
            width: "100%",
            height: "85%",
            // backgroundColor: "pink",
            justifyContent: "center",
            alignItems: "center"
        },
        loader: {
            // backgroundColor: "blue",
            width: "auto"
        }
    }

    function goBackToMonths() {
        navigate("Demo")
    }

    useEffect(() => {
        sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
        fadeIn(); // Trigger fadeIn animation
        const timeout = setTimeout(() => {
            setShowChart(true); // Set showChart to true after 1000 milliseconds (adjust as needed)
        }, 1000); // 
        // Cleanup function
        return () => clearTimeout(timeout);
    }, [])

    return (
        <Screen preset="fixed" safeAreaEdges={[]} style={style.screen_container}>
            <Header title={parsedMonth.monthName.toUpperCase()}
                LeftActionComponent={<Icon size={33} icon="back" onPress={() => goBackToMonths()} />}
                style={{
                    marginLeft: spacing.md,
                }}
            />
            {showChart && <Animated.Text style={{ alignSelf: 'center', fontSize: 17, marginTop: -10, opacity }}>
                <Text tx="chartScreen.averageDayValue" />
                <Text style={{ color: colorsProvider.palette.primary500, fontWeight: "bold" }}>{valueSelected} {valueSelected !== "Select a dot" && "mg/dL"}</Text>
            </Animated.Text>}
            {showChart ? (<Animated.View style={{ ...style.chart_container, opacity }}>
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
                    onDataPointClick={({ value, index }) => {
                        setDotSelected(index)
                        setValueSelected(value)
                    }}
                    getDotColor={(dataPoint, index) =>
                        index === dotSelected ? colorsProvider.palette.primary500 : colors.black
                    }
                    fromZero={true}
                    segments={5}
                    style={{
                        borderRadius: 16,
                        backgroundColor: colors.background,
                        marginBottom: 10,
                        marginLeft: -10
                    }}
                    renderDotContent={(data) => {
                        const infoStyle = {
                            position: 'absolute',
                            left: data.x - 45,
                            top: data.y - 35,
                            backgroundColor: `${colorsProvider.palette.primary500}E6`,
                            borderRadius: 4, paddingHorizontal:
                                spacing.xxs, borderColor: colorsProvider.palette.primary500,
                            borderWidth: 1,
                        }
                        return (
                            data.index === dotSelected &&
                            <View key={data.index} style={infoStyle}>
                                <Text key={data.index}>{data.indexData}{" "}mg/dL</Text>
                            </View>
                        )
                    }}
                />
            </Animated.View>) : (<View style={style.loader_container}>
                <Animated.View style={[animatedStyle]}>
                    <Icon icon="loading" size={40} color={colorsProvider.palette.primary500} />
                </Animated.View>
            </View>)}

        </Screen >
    )
}