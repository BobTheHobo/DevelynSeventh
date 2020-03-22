import { StyleSheet } from 'react-native';
export default StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
modalBox: {
    height: 130,
    width: 250,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5
},
titleSection: {
    margin: 10,
},
title: {
    fontSize: 15,
    color: 'white'
},
confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
},
button: {
    marginHorizontal: 30,
    marginVertical: 10
}
});