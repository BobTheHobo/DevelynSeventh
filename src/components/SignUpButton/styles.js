import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center',
        height: 40,
        margin: 0,
    },
    number: {
        flex: 1,
        borderColor: 'grey',
        borderRightWidth: 1,
        borderWidth: 0,
        alignItems: 'center', 
        justifyContent: 'center',
        height:40,
    },
    teacher:{
        flex: 9,
        borderColor: 'grey',
        borderWidth: 0,
        alignItems: 'flex-start',
        paddingLeft: 10,
        height: 40
    },
    split:{
        flex: 1,
        flexDirection: 'column'
    },
    name:{
        flex: 14,
        textAlignVertical: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    },
    plan:{
        flex: 13,
        textAlignVertical: 'center',
        fontSize: 13,
        margin: 0
    },
    surface:{
        flex:1,
        margin:5,
        flexDirection: 'row', 
        alignItems: 'center',
        height: 40,
        elevation: 1,
    }
});