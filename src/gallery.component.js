import React from 'react';
import { View, Image, ScrollView ,TouchableOpacity, Text} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'

import styles from './styles';

export default ({captures=[],toggleSelectedImage,uploadImage}) => (
    <>
    <ScrollView 
        horizontal={true}
        style={[styles.bottomToolbar, styles.galleryContainer]} 
    >
        {captures.map((image) => (
            <TouchableOpacity  key={image.uri} onPress={() => toggleSelectedImage(image)}>
                {
                    image.selected &&
                    <TouchableOpacity onPress={() => uploadImage(image)} style={styles.uploadButton}>
                        <Ionicons name="cloud-upload" size={24} color="black" />
                        <Text> Upload</Text>
                    </TouchableOpacity>
                }
                <View style={styles.galleryImageContainer}>
                    <Image source={{ uri: image.uri }} style={ image.selected?({...styles.galleryImage,...styles.galleryItemHighlighted}):(styles.galleryImage)} />
                </View>
            </TouchableOpacity>
        ))}
    </ScrollView>
    </>
);