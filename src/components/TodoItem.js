import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {formatDate} from '../utils/DateUtils';
import {useNavigation} from '@react-navigation/native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
import {deleteTask} from '../redux/slices/taskSlice';
import colors from '../themes/Colors';

const TodoItem = ({data}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const startDate = formatDate(data?.startDate);
  const endDate = formatDate(data?.endDate);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <Text
          style={[
            styles.taskTitle,
            data.status === 'finish' ? styles.titleClosed : null,
          ]}>
          {data.title.toUpperCase()}
        </Text>

        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor:
                  data.status === 'new'
                    ? '#308fe3'
                    : data.status === 'progress'
                    ? '#FECCB1'
                    : data.status === 'pending'
                    ? '#fce303'
                    : '#CAF6C6',
              },
            ]}>
            {data.status === 'new' ? (
              <MaterialCommunityIcons
                name="book-edit-outline"
                size={15}
                paddingRight={5}
                color={'#ffffff'}
              />
            ) : data.status === 'progress' ? (
              <MaterialCommunityIcons
                name="book-play-outline"
                size={15}
                paddingRight={5}
                color={'#d6825c'}
              />
            ) : data.status === 'pending' ? (
              <MaterialCommunityIcons
                name="book-off-outline"
                size={15}
                paddingRight={5}
                color={'#a69607'}
              />
            ) : (
              <MaterialCommunityIcons
                name="book-check-outline"
                size={15}
                paddingRight={5}
                color={'#000000'}
              />
            )}
            <Text
              style={{
                color:
                  data.status === 'new'
                    ? '#ffffff'
                    : data.status === 'progress'
                    ? '#d6825c'
                    : data.status === 'pending'
                    ? '#a69607'
                    : '#000000',
              }}>
              {data.status}
            </Text>
          </View>
          <TouchableOpacity
            style={{marginHorizontal: 5}}
            onPress={() =>
              navigation.navigate('AddTask', {task: data, showHeader: true})
            }>
            <MaterialCommunityIcons name="pencil" color={'grey'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginHorizontal: 5}}
            onPress={() => dispatch(deleteTask(data.id))}>
            <MaterialCommunityIcons name="delete" color={'#e0695e'} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={[
          styles.taskDescription,
          data.status === 'finish' ? styles.desClosed : null,
        ]}>
        {data.description}
      </Text>

      <View style={styles.itemFooterContainer}>
        <View>
          <Text style={{color: 'black'}}>Start Date</Text>
          <View style={styles.timeContainer}>
            <MaterialCommunityIcons
              name="clock-outline"
              color={'#9d83e2'}
              size={15}
            />
            <Text style={styles.timeText}>{startDate}</Text>
          </View>
        </View>

        <View>
          <Text style={{color: 'black'}}>End Date</Text>
          <View style={styles.timeContainer}>
            <MaterialCommunityIcons
              name="clock-outline"
              color={'#9d83e2'}
              size={15}
            />
            <Text style={styles.timeText}>{startDate}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  titleClosed: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  desClosed: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  taskTitle: {
    flex: 1,
    fontSize: 20,
    color: colors.text.primary,
    fontWeight: '700',
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 12,
    color: colors.text.primary,
    fontWeight: '600',
    marginVertical: 10,
  },
  itemHeader: {flexDirection: 'row', justifyContent: 'space-between'},
  itemFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    color: colors.primary,
    fontWeight: '600',
    marginHorizontal: 5,
    fontSize: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
