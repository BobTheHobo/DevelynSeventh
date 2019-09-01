import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center',
        height: 40,
        margin: 5
    },
    number: {
        flex: 1,
        borderColor: 'black',
        borderRightWidth: 0,
        borderWidth: 2,
        alignItems: 'center', 
        justifyContent: 'center',
        height:40
    },
    teacher:{
        flex: 9,
        borderColor: 'black',
        borderWidth: 2,
        alignItems: 'flex-start',
        paddingLeft: 10,
        height: 40
    }
});