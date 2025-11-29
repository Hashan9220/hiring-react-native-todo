import { createStackNavigator } from '@react-navigation/stack';
import TodoListScreen from '../screens/TodoListScreen';
import TodoDetailScreen from '../screens/TodoDetailScreen';

const Stack = createStackNavigator();

const AppNav = () => {
  return (
    <Stack.Navigator initialRouteName="TodoList" screenOptions={{headerShown: false}}>
      <Stack.Screen name="TodoList" component={TodoListScreen} />
      <Stack.Screen name="TodoDetail" component={TodoDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNav;
