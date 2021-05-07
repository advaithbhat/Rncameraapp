import React from 'react';
import { Camera } from 'expo-camera';
import { View, Text ,Alert} from 'react-native';
import * as Permissions from 'expo-permissions';

import styles from './styles';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';

export default class CameraPage extends React.Component {
    camera = null;

    state = {
        captures: [],
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [{...photoData,selected:false}, ...this.state.captures] })
    };

    toggleSelectedImage = (image) => {
        this.setState({ capturing: false, captures: this.state.captures.map(innerImage => innerImage===image?({...image,selected:!image.selected}):({...innerImage,selected:false}))  })
    }

    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    };

    deleteImage = (image) => {
        this.setState({ capturing: false, captures: this.state.captures.filter(innerImage => innerImage!==image)})
    }

    uploadImage = (imageToUpload) => {
        
        const formData = new FormData()

        const imageName = imageToUpload.uri.split("/").pop()
        const type = imageToUpload.uri.split(".").pop()

        formData.append("image",{
        name: imageName,
        type: "image/"+type,
        uri: imageToUpload.uri
        })

        fetch("http://192.168.43.237:3000/api/detect/",{
            method:"POST",
            headers:{
            "Content-Type":"multipart/form-data"
        },
            body:formData
        })
        .then(data =>{ 
            console.log(data)
            return data.json()
        })
        .then(data => {
            if(data.hasOwnProperty("text")){
                this.deleteImage(imageToUpload)
                console.log(data)
                Alert.alert("Success!","Uploaded successfully")
            } else {
                throw Error("Something went wrong")
            }
        })
        .catch(err =>{ 
            console.log(err)
            Alert.alert("OOps!","Something went wrong, please try again")
        })
    }

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                    />
                </View>

                {captures.length > 0 && <Gallery uploadImage={this.uploadImage} toggleSelectedImage={this.toggleSelectedImage} captures={captures}/>}

                <Toolbar 
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onCaptureIn={this.handleCaptureIn}
                    onCaptureOut={this.handleCaptureOut}
                    onLongCapture={this.handleLongCapture}
                    onShortCapture={this.handleShortCapture}
                />
            </React.Fragment>
        );
    };
};