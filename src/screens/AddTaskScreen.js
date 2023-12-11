import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addTask, editTask} from '../redux/slices/taskSlice';
import CustomTextInputWithLabel from '../components/CustomTextinputWIthLabel';
import TextInputTodoList from '../components/TodoList';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import TaskNameIcon from '../assets/images/TaskName2x.png';
import DatePickerIcon from '../assets/images/DatePicker.png';
import {useRoute} from '@react-navigation/native';
import colors from '../themes/Colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {showToast} from '../utils/ToastUtils';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';

const screenWidth = Dimensions.get('window').width;

const AddTaskScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  const {task, showHeader} = route?.params;

  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const [selectedDatePicker, setSelectedDatePicker] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'New', value: 'new'},
    {label: 'Progress', value: 'progress'},
    {label: 'Pending', value: 'pending'},
    {label: 'Finish', value: 'finish'},
  ]);

  useLayoutEffect(() => {
    setTitle(task?.title);
    setDescription(task?.description);
    setSelectedStartDate(task ? task?.startDate : new Date().toISOString());
    setSelectedEndDate(task ? task?.endDate : new Date().toISOString());
    setValue(task?.status);
    navigation.setOptions({
      headerShown: showHeader,
      title: task?.title ? 'Edit Task' : 'Add Task',
    });
  }, [navigation, showHeader, task]);

  const showDateTimePicker = state => {
    setSelectedDatePicker(state);
    setDatePickerVisibility(true);
  };

  const hideDateTimePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateTimeConfirm = date => {
    if (selectedDatePicker === 'selectedStartDate') {
      console.log('selectedStartDate', date.toString());
      setSelectedStartDate(date);
    } else if (selectedDatePicker === 'selectedEndDate') {
      console.log('selectedEndDate', date.toString());
      setSelectedEndDate(date);
    }
    hideDateTimePicker();
  };

  const handleAddTask = () => {
    const newTask = {
      title,
      description,
      completed: false,
      startDate: selectedStartDate.toString(),
      endDate: selectedEndDate.toString(),
      status: value ? value : 'new',
      id: task ? task.id : Date.now(),
    };
    if (title) {
      task ? dispatch(editTask(newTask)) : dispatch(addTask(newTask));
      setTitle('');
      setDescription('');
      setSelectedEndDate('');
      setValue('');
      setSelectedEndDate('');
      navigation.navigate('TaskList');
    } else {
      showToast('error', 'Please fill the task');
    }
  };
  
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableAutomaticScroll={Platform.OS === 'ios'}
      enableOnAndroid={true}
      extraHeight={350}>
      <View style={styles.headerContainer}>
        <View style={styles.ellipseContainer}>
          <Image
            source={require('../assets/images/Ellipse2x.png')}
            style={styles.ellipseImage}
          />

          <View style={styles.taskImageContainer}>
            <Image
              source={require('../assets/images/Pencil2x.png')}
              resizeMode="stretch"
              style={styles.taskImage}
            />
          </View>
        </View>
        <CustomTextInputWithLabel
          label="Task Name"
          imageSource={TaskNameIcon}
          onChangeText={setTitle}
          value={title}
        />

        <CustomTextInputWithLabel
          label="Task Description"
          imageSource={TaskNameIcon}
          onChangeText={setDescription}
          value={description}
        />

        {/* <TextInputTodoList  />         */}

        <View style={{flexDirection: 'row'}}>
          <CustomTextInputWithLabel
            isDate={true}
            style={{width: '40%'}}
            label="Start Date and Time"
            imageSource={DatePickerIcon}
            onPressIcon={() => showDateTimePicker('selectedStartDate')}
            value={selectedStartDate}
          />
          <CustomTextInputWithLabel
            isDate={true}
            style={{width: '40%'}}
            label="End Date and Time"
            imageSource={DatePickerIcon}
            onPressIcon={() => showDateTimePicker('selectedEndDate')}
            value={selectedEndDate}
          />
        </View>

        <View style={styles.dropDownContainer}>
          <View>
            <Text style={styles.status}>Status</Text>
            <DropDownPicker
              listMode="SCROLLVIEW"
              placeholder={'Select a status'}
              containerStyle={{width: '90%'}}
              style={{borderWidth: 0}}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleAddTask}
        style={styles.addButtonContainer}>
        <MaterialCommunityIcons
          style={styles.saveButtonIcon}
          name="content-save"
          size={60}
        />
        <Text style={styles.addButtonText}>Save Task</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateTimeConfirm}
        onCancel={hideDateTimePicker}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
  },
  headerContainer: {
    width: screenWidth,
    position: 'absolute',
  },
  ellipseImage: {
    width: 220,
    height: 220,
    tintColor: colors.primary,
    position: 'absolute',
  },
  taskImageContainer: {
    alignItems: 'center',
    transform: [{scaleX: -1}],
    marginTop: -30,
  },
  taskImage: {width: 250, height: 250},
  addButtonContainer: {
    width: '90%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,  
  },
  addButtonText: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  ellipseContainer: {
    flex: 1,
    transform: [{scaleX: -1}],
    marginBottom: -30,
  },
  status: {
    fontSize: 15,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 5,
  },
  dropDownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  saveButtonIcon: {
    paddingHorizontal: 110,
    paddingTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
  },
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginTop: -28,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 1,
    borderRightColor: '#EBEBEB',
    color: '#666666',
  },
  addButton: {
    backgroundColor: '#FFF',
    height: 56,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default AddTaskScreen;
