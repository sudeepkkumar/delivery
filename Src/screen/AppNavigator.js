
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Splash from './Splash'
import Login from './Login'
import Dashboard from './Dashboard'
import Edititem from './Edititem'
import Signin from './Tabs/user/Signin'
import Userlogin from './Tabs/user/Userlogin'
import Usersignup from './Tabs/user/Usersignup'
import Home from './Tabs/user/Home'


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
                <Stack.Screen
                    component={Edititem}
                    name="Edititem"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    component={Signin}
                    name="Signin"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    component={Userlogin}
                    name="Userlogin"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    component={Usersignup}
                    name="Usersignup"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    component={Home}
                    name="Home"
                    options={{ headerShown: false }}
                />


            </Stack.Navigator>

        </NavigationContainer>
    );
};

export default AppNavigator;