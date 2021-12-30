import { Dimensions, PixelRatio, StatusBar } from 'react-native'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

// Responsive width
const widthPercentageToDP = widthPercent => {
    const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent)
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100)
};

// Responsive height
const heightPercentageToDP = heightPercent => {
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent)
    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100)
};

// Responsive font
const standardLength =
    screenWidth > screenHeight ? screenWidth :
        screenHeight < 700 ? screenHeight - screenHeight * 0.325 :
            screenHeight - screenHeight * 0.1
const offset = screenWidth > screenHeight ? 0 : Platform.OS === "ios" ? 78 : StatusBar.currentHeight

const deviceHeight =
    Platform.OS === "android"
        ? standardLength - offset
        : standardLength

function RFPercentage(percent) {
    const heightPercent = (percent * deviceHeight) / 100
    return Math.round(heightPercent)
}

export {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    RFPercentage as fp
}