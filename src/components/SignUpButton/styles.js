import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center',
        height: 40,
        margin: 0
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
    },
    split:{
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'column'
    },
    name:{
        flex: 14,
        textAlignVertical: 'center',
        backgroundColor: 'bisque',
        fontSize: 15,
        fontWeight: 'bold'
    },
    plan:{
        flex: 13,
        textAlignVertical: 'center',
        backgroundColor: 'aqua',
        fontSize: 13,
        margin: 0
    },
    surface:{
        flex:1,
        margin:5,
        flexDirection: 'row', 
        alignItems: 'center',
        height: 40,
        elevation: 7,
    }
});