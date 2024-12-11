import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ParentComponent = () => {
  const [recordings, setRecordings] = useState([
    // Example recording data
    { uri: 'file://recording1.mp3', name: 'Recording 1', label: 'Happy' },
    { uri: 'file://recording2.mp3', name: 'Recording 2', label: 'Anger' },
  ]);
  const navigation = useNavigation();

  return (
    <View>
      <Button
        title="Go to Recording History"
        onPress={() =>
          navigation.navigate('RecordingHistory', { recordings, setRecordings })
        }
      />
    </View>
  );
};

export default ParentComponent;
