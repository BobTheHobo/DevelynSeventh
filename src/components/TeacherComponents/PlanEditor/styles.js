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
    height: 40,
    marginHorizontal: 10,
    backgroundColor: 'lightgrey'
},
confirmTextEditButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: 'lightblue',
    height: 40,
    margin: 10,
    marginTop: 10,
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