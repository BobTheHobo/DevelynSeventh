import { StyleSheet } from 'react-native';

export default StyleSheet.create({
container: {
    flex: 1,
    padding: 0,
    margin: 10,
    //backgroundColor: 'grey'
    backgroundColor: 'white'
},
title: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold'
},
textEdit: {
    marginHorizontal: 10,
    //backgroundColor: 'lightgrey'
},
confirmTextEditButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //backgroundColor: 'lightblue',
    margin: 10,
    marginTop: 10,
},
confirmNumEditButtons: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
},
numEdit: {
    height: 40,
    marginHorizontal: 10,
    flexDirection: 'row',
},
numButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    height: 19,
    borderRadius: 2,
    elevation: 4,
    width: 30,
},
numUpDown:{
    height: 40,
    flexDirection: 'column',
    justifyContent: 'space-between'
},  
email: {
    fontSize: 15,
},
studentnum: {
    fontSize: 15
},
profileImg: {
    height: 40,
    width: 40,
    borderRadius: 20
},
});