import { StyleSheet } from 'react-native';

export default StyleSheet.create({
surface: {
    elevation: 1,
    margin: 10,
    height: 110,
    borderRadius: 5,
},
container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center'
},
title: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold'
},
searchS:{
    marginHorizontal: 10,
    flexDirection: 'row'
},
searchBox: {
    flex: 1,
},
searchButton:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    elevation: 4,
    borderRadius: 2,
    width: 40,
    height: 40,
}
});