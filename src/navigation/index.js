import React, { useState, useEffect } from "react"
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home, Splash, Detail, ListMovie } from '../screens'
import { HOME, SPLASH, DETAIL, LIST_MOVIE } from '../config/navigation'

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const [isSplashShow, setSplashShow] = useState(true)

    useEffect(() => {
        isSplashShow && setTimeout(() => setSplashShow(false), 2000)
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isSplashShow &&
                    <Stack.Screen name={SPLASH} component={Splash} />
                }
                <Stack.Screen name={HOME} component={Home} />
                <Stack.Screen name={DETAIL} component={Detail} />
                <Stack.Screen name={LIST_MOVIE} component={ListMovie} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;