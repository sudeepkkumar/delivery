
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
import Cart from './Tabs/user/Cart'
import Checkout from '../Checkout/Checkout'
import Address from '../Checkout/Address'
import Addnewaddress from '../Checkout/Addnewaddress'
import OrderStatus from '../Checkout/OrderStatus'
import Profile from './Tabs/user/Profile/Profile'
import Edit1s from './Tabs/user/Profile/Edit1s'
import Changepassword from './Tabs/user/Profile/Changepassword'
import Search from'./Tabs/user/Search'
import Description from './Tabs/user/Description'


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
                <Stack.Screen
                    component={Cart}
                    name="Cart"
                    options={{ headerShown: true }}
                />

                <Stack.Screen
                    component={Checkout}
                    name="Checkout"
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    component={Address}
                    name="Address"
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    component={Addnewaddress}
                    name="Addnewaddress"
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    component={OrderStatus}
                    name="OrderStatus"
                    options={{ headerShown: false }}

                />
                <Stack.Screen
                    component={Profile}
                    name="Profile"
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    component={Edit1s}
                    name="Edit1s"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    component={Changepassword}
                    name="Changepassword"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    component={Search}
                    name="Search"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    component={Description}
                    name="Description"
                    options={{ headerShown: true }}
                />
               



               



            </Stack.Navigator>

        </NavigationContainer>
    );
};

export default AppNavigator;