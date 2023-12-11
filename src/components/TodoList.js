// import React from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   View,
//   FlatList,
//   StyleSheet,
//   Text,
//   StatusBar,
//   KeyboardAvoidingView,
//   TextInput,
//   TouchableWithoutFeedback,
//   Button,
//   Keyboard,
// } from 'react-native';
// import colors from '../themes/Colors';


// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
// ];

// const Item = ({title}) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );

// const ListItem = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View>
//           <Text style={styles.titleList}>List Item</Text>
//           <View style={styles.btnContainer}>
//             <TextInput placeholder="Add List Tasks" style={styles.textInput} />
//             <Button title="Add Item" onPress={() => null} />
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//       <ScrollView style={styles.scrollView}>
//         <Text style={styles.titleList}>List Item</Text>
//         <FlatList
//           data={DATA}
//           renderItem={({item}) => <Item title={item.title} />}
//           keyExtractor={item => item.id}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginBottom: StatusBar.currentHeight || 0,
//   },
//   titleList: {
//     marginHorizontal: 20,
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: colors.text.primary,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     backgroundColor: '#fff',
//     padding: 10,
//     marginVertical: 8,
//     borderRadius: 20,
//     marginHorizontal: 20,
//   },
//   title: {
//     fontSize: 15,
//   },
//   textInput: {
//     height: 40,
//     borderColor: '#000000',
//     marginHorizontal: 20,
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: colors.text.primary,
//   },
//   btnContainer: {
//     backgroundColor: '#fff',
//     marginTop: 12,
//     padding: 10,
//     marginVertical: 8,
//     borderRadius: 20,
//     marginHorizontal: 20,
//   },
// });

// export default ListItem;
