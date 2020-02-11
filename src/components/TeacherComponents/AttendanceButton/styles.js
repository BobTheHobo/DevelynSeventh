import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center',
        height: 60,
        margin: 0,
    },
    name: {
        flex: 10,
        marginLeft: 10,
        alignItems: 'flex-start', 
        justifyContent: 'center',
        height:60,
    },
    surface:{
        flex:1,
        margin:5,
        flexDirection: 'row', 
        alignItems: 'center',
        height: 60,
        elevation: 1,
    },
    presentButton:{
        flex: 1.2,
        margin: 6,
    },
    lateButton:{
        flex: 1.2,
        margin: 6
    },
    absentButton:{
        flex: 1.2,
        margin: 6
    },
});