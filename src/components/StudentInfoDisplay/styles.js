import { StyleSheet } from 'react-native';
import { black } from 'ansi-colors';
export default StyleSheet.create({
box: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'flex-start',
    borderColor: 'black',
    borderWidth: 5,
    padding: 3,
    margin: 20,
},
container: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    margin: 10,
},
name: {
    fontSize: 25,
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