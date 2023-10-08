
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Splash from './Splash'
import Login from './Login'
import Dashboard from './Dashboard'


const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    component={Splash}
                    name="Splash"
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    component={Login}
                    name="Login"
                    options={{ headerShown: false }}
                />


                <Stack.Screen
                    component={Dashboard}
                    name="Dashboard"
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>

        </NavigationContainer>
    );
};

export default AppNavigator;