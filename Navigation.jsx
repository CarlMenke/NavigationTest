import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabActions, useFocusEffect, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { Animated, TouchableOpacity } from 'react-native';
import ProjectList from './ProjectList';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', gap: 10, paddingHorizontal: 10 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : .5)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center', padding: 10, backgroundColor: '#EEEEEF', borderRadius: 10}}
          >
            <Animated.Text style={{ opacity }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function BottomTabA() {
    return (
        <Stack.Navigator initialRouteName='BottomTabAStackA'>
            <Stack.Screen name='BottomTabAStackA' component={BottomTabAStackA} />
            <Stack.Screen name='BottomTabAStackB' component={BottomTabAStackB}/>
        </Stack.Navigator>
    )
}

const BottomTabAStackA = () => {

    const route = useRoute()
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    // this is better becuase it will wait to see if it is focused?
    useFocusEffect(() => {
        const params = route.params
        if (params && isFocused && params.openProject) {
            setTimeout(() => {
                navigation.navigate('BottomTabAStackB', params.openProject)
            }, 200);
            navigation.setParams({...params, openProject: undefined})
        }
    })

    return (
        <View style={styles.container}>
            <Text>AA</Text>
            <ProjectList/>
        </View>
    )
}
const BottomTabAStackB = () => {

    const route = useRoute()
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    // this is better becuase it will wait to see if it is focused?
    useFocusEffect(() => {
        const params = route.params
        console.log('running focused')
        if (isFocused && params.openTab) {
            setTimeout(() => {
                navigation.dispatch(TabActions.jumpTo(params.openTab))
            }, 500)
            navigation.setParams({...params, openTab: undefined})
        }
    })

    return (
        <View style={styles.container}>
            <View style={{padding: 20}}>
                <Text style={{fontSize: 20}}>Project View + {route?.params?.projectId || 'no params'}</Text>
            </View>
            <Pressable onPress={()=>{navigation.dispatch(TabActions.jumpTo('BottomTabAStackBTabB'))}}>
                <Text>Dispatch jump to tab B</Text>
            </Pressable>
            <TopTab.Navigator
                screenOptions={{animationEnabled: false}}
                initialRouteName='BottomTabAStackBTabA'
                tabBar={MyTabBar}>
                <TopTab.Screen name={'BottomTabAStackBTabA'} options={{tabBarLabel:'BottomTabAStackBTabA'}} component={BottomTabAStackBTabA}/>
                <TopTab.Screen name={'BottomTabAStackBTabB'}  options={{tabBarLabel:'BottomTabAStackBTabB'}} component={BottomTabAStackBTabB}/>
            </TopTab.Navigator>
    </View>
    )
}

const BottomTabAStackBTabA = () => {
    return (
        <View style={styles.container}>
            <Text>ABA</Text>
        </View>
    )
}
const BottomTabAStackBTabB = () => {

    const route = useRoute()

    return (
        <View style={styles.container}>
            <View style={{padding: 20}}>
                <Text style={{fontSize: 20}}>ABB + {route?.params?.projectId || 'no params'}</Text>
            </View>
            <TopTab.Navigator
                initialRouteName='BottomTabAStackBTabBTabA'
                tabBar={MyTabBar}>
                <TopTab.Screen name={'BottomTabAStackBTabBTabA'} options={{tabBarLabel:'BottomTabAStackBTabBTabA'}} component={BottomTabAStackBTabBTabA}/>
                <TopTab.Screen name={'BottomTabAStackBTabBTabB'} options={{tabBarLabel:'BottomTabAStackBTabBTabB'}} component={BottomTabAStackBTabBTabB}/>
            </TopTab.Navigator>
        </View>
    )
}

const BottomTabAStackBTabBTabA = () => {
    return (
        <View style={styles.container}>
            <Text>ABBA</Text>
        </View>
    )
}
const BottomTabAStackBTabBTabB = () => {
    return (
        <View style={styles.container}>
            <Text>ABBB</Text>
        </View>
    )
}

function BottomTabB() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='BottomTabBStackA' component={BottomTabBStackA} />
            <Stack.Screen name='BottomTabBStackB' component={BottomTabBStackB}/>
        </Stack.Navigator>
    )
}
const BottomTabBStackA = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Text>BA</Text>
            <Pressable onPress={()=>navigation.navigate('BottomTabBStackB')}><Text>Go to BottomTabBStackB</Text></Pressable>
        </View>
    )
}
const BottomTabBStackB = () => {
    const navigation = useNavigation()

    // open BottomTabA and have a certain tab open and then inside of that tab have another certain tab open
    return (
        <View style={styles.container}>
            <Text>BB</Text>
            <Pressable onPress={() => navigation.navigate('BottomTabAStackA', { openProject: { projectId: 'BB1', openTab: 'BottomTabAStackBTabB'}})} style={{padding: 30}}><Text>Go to BottomTabAStackB BB1 second tab</Text></Pressable>
            {/* <Pressable onPress={()=> navigation.navigate('BottomTabAStackB', {projectId:'BB2'})}><Text>Go to BottomTabAStackB BB2</Text></Pressable> */}
        </View>
    )
}





export function BottomTabs() {
  return (
    <BottomTab.Navigator >
      <BottomTab.Screen name="BottomTabA" component={BottomTabA} />
      <BottomTab.Screen name="BottomTabB" component={BottomTabB} />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
