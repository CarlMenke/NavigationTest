import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProjectList = () => {
  const navigation = useNavigation();

  const projectData = Array.from({ length: 100 }, (_, index) => ({
    projectId: index + 1, // Generating project IDs from 1 to 100
    projectName: `Project ${index + 1}`,
  }));

  const handleItemPress = (projectId) => {
    navigation.navigate('BottomTabAStackB', { projectId });
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handleItemPress(item.projectId)}>
      <View style={{ padding: 16, width: '100%'}}>
        <Text>{item.projectName}</Text>
        <Text>Project ID: {item.projectId}</Text>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={projectData}
      renderItem={renderItem}
      style={{width: '100%'}}
      keyExtractor={(item) => item.projectId.toString()}
    />
  );
};

export default ProjectList;