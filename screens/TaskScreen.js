import { ActivityIndicator, FlatList, Text, View, TextInput, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CardTask } from "../components/CardTask";
import { getTasks, updateTask, addTask, removeTask } from "../api/task";

export const TaskScreen = ({ navigation }) => {
  const [text, onChangeText] = useState('');
  const queryClient = useQueryClient();
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const mutation = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const mutationAdd = useMutation((task) => addTask(task), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const mutationRemove = useMutation((id) => removeTask(id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View  style={styles.view}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />

        <Button
          title="Add"
          onPress={() => { mutationAdd.mutate(text) }}
        />
      </View>

      {isFetching && <Text>IS FETCHING</Text>}
      <FlatList
        data={data.results}
        keyExtractor={(item) => item.objectId}
        renderItem={({ item }) => (
          <View style={styles.cardTask}>
            <CardTask
              task={item}
              navigation={navigation}
              taskDoneChange={mutation.mutate}
            />
            <Button
              title="Remove"
              onPress={() => { mutationRemove.mutate(item.objectId)}}
            />            
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 35,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  cardTask: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
});
