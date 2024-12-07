import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import FlashScreen from './screens/FlashScreen';
import FlashScreen1 from './screens/FlashScreen1';
import DashBoard from './screens/DashBoard';
import Sound from './screens/Sound';
import AspinSounds from './screens/AspinSounds';
import ShihtzuSounds from './screens/ShihtzuSounds';
import SoundMeans from './screens/SoundMeans';
import StartRecordings from './screens/StartRecordings';
import DogEmotionDetected from './screens/DogEmotionDetected';
import RecordingHistory from './screens/RecordingHistory';
import AngerScreen from "./screens/AngerScreen";
import AggressiveScreen from "./screens/AggressiveScreen";
import HappyScreen from "./screens/HappyScreen";
import AlertnessScreen from "./screens/AlertnessScreen";
import PainScreen from "./screens/PainScreen";
import GrowlingScreen from "./screens/GrowlingScreen";
import SadScreen from "./screens/SadScreen";
import ParentComponent from "./screens/ParentComponent";
import Description1 from './screens/Description1';
import Description2 from './screens/Description2';
import Description3 from './screens/Description3';

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = useState(true);

  const [fontsLoaded, error] = useFonts({
    'Oswald-Bold': require('./assets/fonts/Oswald-Bold.ttf'),
    'Quicksand-Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded && !error) {
    return null; // Return null while fonts are loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {hideSplashScreen ? (
          <>
            <Stack.Screen name="FlashScreen" component={FlashScreen} />
            <Stack.Screen name="FlashScreen1" component={FlashScreen1} />
            <Stack.Screen name="DashBoard" component={DashBoard} />
            <Stack.Screen name="Sound" component={Sound} />
            <Stack.Screen name="AspinSounds" component={AspinSounds} />
            <Stack.Screen name="ShihtzuSounds" component={ShihtzuSounds} />
            <Stack.Screen name="SoundMeans" component={SoundMeans} />
            <Stack.Screen name="StartRecordings" component={StartRecordings} />
            <Stack.Screen name="DogEmotionDetected" component={DogEmotionDetected} />
            <Stack.Screen name="AngerScreen" component={AngerScreen} />
            <Stack.Screen name="SadScreen" component={SadScreen} />
            <Stack.Screen name="AggressiveScreen" component={AggressiveScreen} />
            <Stack.Screen name="HappyScreen" component={HappyScreen} />
            <Stack.Screen name="AlertnessScreen" component={AlertnessScreen} />
            <Stack.Screen name="PainScreen" component={PainScreen} />
            <Stack.Screen name="GrowlingScreen" component={GrowlingScreen} />
            <Stack.Screen name="ParentComponent" component={ParentComponent} />
            <Stack.Screen name="Description1" component={Description1} />
            <Stack.Screen name="Description2" component={Description2} />
            <Stack.Screen name="Description3" component={Description3} />
          </>
        ) : null}
        <Stack.Screen name="RecordingHistory" component={RecordingHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;








// import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useFonts } from 'expo-font';
// import FlashScreen from './screens/FlashScreen';
// import FlashScreen1 from './screens/FlashScreen1';
// import DashBoard from './screens/DashBoard';
// import Sound from './screens/Sound';
// import AspinSounds from './screens/AspinSounds';
// import ShihtzuSounds from './screens/ShihtzuSounds';
// import SoundMeans from './screens/SoundMeans';
// import StartRecordings from './screens/StartRecordings';
// import DogEmotionDetected from './screens/DogEmotionDetected';
// import RecordingHistory from './screens/RecordingHistory'; // Import the RecordingHistory component
// import AngerScreen from "./screens/AngerScreen";
// import AggressiveScreen from "./screens/AggressiveScreen";
// import HappyScreen from "./screens/HappyScreen";
// import AlertnessScreen from "./screens/AlertnessScreen";
// import PainScreen from "./screens/PainScreen";
// import GrowlingScreen from "./screens/GrowlingScreen";
// import SadScreen from "./screens/SadScreen";
// import ParentComponent from "./screens/ParentComponent";

// import Description1 from './screens/Description1'; // Make sure Description1 is properly imported
// // import Description2 from './screens/Description2'; // Make sure Description2 is properly imported
// // import Description3 from './screens/Description3'; // Make sure Description3 is properly imported
// // import SoundsComponent from "./screens/SoundsComponent";

// const Stack = createNativeStackNavigator();

// const App = () => {
//   const [hideSplashScreen, setHideSplashScreen] = useState(true);

//   const [fontsLoaded, error] = useFonts({
//     'Oswald-Bold': require('./assets/fonts/Oswald-Bold.ttf'),
//     'Quicksand-Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
//     'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
//   });

//   if (!fontsLoaded && !error) {
//     return null;
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {hideSplashScreen ? (
//           <>
//             <Stack.Screen name="FlashScreen" component={FlashScreen} />
//             <Stack.Screen name="FlashScreen1" component={FlashScreen1} />
//             <Stack.Screen name="DashBoard" component={DashBoard} />
//             <Stack.Screen name="Sound" component={Sound} />
//             <Stack.Screen name="AspinSounds" component={AspinSounds} />
//             <Stack.Screen name="ShihtzuSounds" component={ShihtzuSounds} />
//             <Stack.Screen name="SoundMeans" component={SoundMeans} />
//             <Stack.Screen name="StartRecordings" component={StartRecordings} />
//             <Stack.Screen name="DogEmotionDetected" component={DogEmotionDetected} />
//             <Stack.Screen name="AngerScreen" component={AngerScreen} />
//             <Stack.Screen name="SadScreen" component={SadScreen} />
//             <Stack.Screen name="AggressiveScreen" component={AggressiveScreen} />
//             <Stack.Screen name="HappyScreen" component={HappyScreen} />
//             <Stack.Screen name="AlertnessScreen" component={AlertnessScreen} />
//             <Stack.Screen name="PainScreen" component={PainScreen} />
//             <Stack.Screen name="GrowlingScreen" component={GrowlingScreen} />
//             <Stack.Screen name="ParentComponent" component={ParentComponent} />

//             <Stack.Screen name="Description1" component={Description1} />


//             {/* <Stack.Screen name="Description2" component={Description2} />
//             <Stack.Screen name="Description3" component={Description3} /> */}
          

//           </>
//         ) : null}
//         {/* Add RecordingHistory screen */}
//         <Stack.Screen name="RecordingHistory" component={RecordingHistory} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;



















// const Stack = createNativeStackNavigator();
// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import FlashScreen from "./screens/FlashScreen";
// import FlashScreen1 from "./screens/FlashScreen1";
// import DashBoard from "./screens/DashBoard";
// import Sound from "./screens/Sound";
// import AspinSounds from "./screens/AspinSounds";
// import ShihtzuSounds from "./screens/ShihtzuSounds";
// import SoundMeans from "./screens/SoundMeans";
// import StartRecordings from "./screens/StartRecordings";
// import DogEmotionDetected from "./screens/DogEmotionDetected";


// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { View, Text, Pressable, TouchableOpacity } from "react-native";

// const App = () => {
//   const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

//   const [fontsLoaded, error] = useFonts({
//     "Oswald-Bold": require("./assets/fonts/Oswald-Bold.ttf"),
//     "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
//     "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
//   });

//   if (!fontsLoaded && !error) {
//     return null;
//   }

//   return (
//     <>
//       <NavigationContainer>
//         {hideSplashScreen ? (
//           <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen
//               name="FlashScreen"
//               component={FlashScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="FlashScreen1"
//               component={FlashScreen1}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="DashBoard"
//               component={DashBoard}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Sound"
//               component={Sound}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="AspinSounds"
//               component={AspinSounds}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="ShihtzuSounds"
//               component={ShihtzuSounds}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="SoundMeans"
//               component={SoundMeans}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="StartRecordings"
//               component={StartRecordings}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="DogEmotionDetected"
//               component={DogEmotionDetected}
//               options={{ headerShown: false }}
//             />
//           </Stack.Navigator>
//         ) : null}
//       </NavigationContainer>
//     </>
//   );
// };
// export default App;
