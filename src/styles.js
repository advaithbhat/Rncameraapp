import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
    alignCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    preview: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    bottomToolbar: {
        width: winWidth,
        position: 'absolute',
        height: 160,
        bottom: 0,
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#FFFFFF",
    },
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: "red",
        borderColor: "transparent",
    },
    galleryContainer: { 
        bottom: 100 
    },
    galleryImageContainer: { 
        width: 100, 
        height: 100, 
        marginRight: 5 
    },
    galleryImage: { 
        width: 100, 
        height: 100,
    },
    galleryItemHighlighted:{
        borderWidth: 2,
        borderColor: "#fff"
    },
    uploadButton:{
        position:"absolute",
        zIndex:3,
        backgroundColor:"#fff",
        borderRadius:50,
        padding: 8,
        marginLeft: 6,
        marginTop: 8,
        height: 42,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    }
});