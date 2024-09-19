import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Dialog, HelperText, Portal, useTheme} from 'react-native-paper';
import {colors, fonts, images} from '../constant';
import {Back, Design} from '../../assets/svg';
import {AuthButton, Block, ProfileTextInput} from '../components';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import {newStoryType} from '../Types/Story.types';
import {addStoryToFirestore} from '../services/Story';
import {useUserContext} from '../context/UserContex';
import {useLoadingContext} from '../context/LoadingContext';
import Toast from 'react-native-toast-message';
const {width, height} = Dimensions.get('window');

const CreateStories: React.FunctionComponent = () => {
  const {loading, setLoading} = useLoadingContext();
  const theme = useTheme();
  const navigation = useNavigation();
  const [visible, setVisible] = useState<boolean>(false);
  const {user} = useUserContext();
  const hideDialog = () => setVisible(false);
  const [newStory, setNewStory] = useState<newStoryType>({
    image: undefined,
    title: '',
    description: '',
  });
  const [errorValidation, setErrorValidation] = useState({
    imageVisible: false,
    imageText: '',
    titleVisible: false,
    titleText: '',
    descriptionVisible: false,
    descriptionText: '',
  });
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        setNewStory({
          ...newStory,
          image: image.path,
        });
      })
      .catch(error => console.log(error))
      .finally(() => setVisible(false));
  };
  const handlePostStory = () => {
    setLoading(true);
    let errTemp = {
      imageVisible: false,
      imageText: '',
      titleVisible: false,
      titleText: '',
      descriptionVisible: false,
      descriptionText: '',
    };
    if (newStory.image === undefined) {
      errTemp = {
        ...errTemp,
        imageText: 'Image is Required',
        imageVisible: true,
      };
    }
    if (newStory.title.length <= 0) {
      errTemp = {
        ...errTemp,
        titleText: 'Title is Required',
        titleVisible: true,
      };
    }
    if (newStory.description.length <= 0) {
      errTemp = {
        ...errTemp,
        descriptionText: 'Story is Required',
        descriptionVisible: true,
      };
    }
    if (newStory.description.length > 1000) {
      errTemp = {
        ...errTemp,
        descriptionText: 'Story can not be greater than 1000 characters',
        descriptionVisible: true,
      };
    }
    if (newStory.description.length < 100 && newStory.description.length > 10) {
      errTemp = {
        ...errTemp,
        descriptionText: 'Story is too Short',
        descriptionVisible: true,
      };
    }
    setErrorValidation(errTemp);
    if (
      newStory.image &&
      newStory.title.length > 0 &&
      newStory.description.length > 100 &&
      newStory.description.length <= 1000
    ) {
      addStoryToFirestore(
        newStory.image,
        newStory.title,
        newStory.description,
        user,
      )
        .then(res => {
          Toast.show({
            type: 'tomatoToast',
            text1:
              'Story Posted Successfully! You will be able to see your story shortly.',
          });
          navigation.goBack();
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  };
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
      includeBase64: true,
    })
      .then(image => {
        setNewStory({
          ...newStory,
          image: image.path,
        });
      })
      .catch(error => console.log(error))
      .finally(() => setVisible(false));
  };

  return (
    <>
      <View style={{marginBottom: 90}}>
        <View
          style={[styles.contanier, {backgroundColor: theme.colors.tertiary}]}
        />
        <View style={styles.design}>
          <Design />
        </View>
        <View style={styles.header}>
          <View style={styles.inner}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (navigation.canGoBack()) navigation.goBack();
              }}>
              <Back width={30} height={30} fill={theme.colors.onSecondary} />
            </TouchableOpacity>
            <Text style={styles.text}>Make Your Story</Text>
          </View>
          <TouchableOpacity onPress={handlePostStory}>
            <Text style={[styles.text, {color: theme.colors.primary}]}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Block alignItems="center" viewStyle={{top: 20}}>
        <View
          style={[styles.image, {borderColor: theme.colors.outlineVariant}]}>
          {newStory.image === undefined ? (
            <AuthButton
              heading="Upload Image"
              onPress={() => {
                setVisible(true);
              }}
            />
          ) : (
            <Pressable
              style={styles.imageStyle}
              onPress={() => setVisible(true)}>
              <Image
                source={{uri: `${newStory.image}`}}
                style={styles.imageStyle}
              />
            </Pressable>
          )}
        </View>
        <HelperText
          type="error"
          visible={errorValidation.imageVisible}
          padding="none"
          style={styles.helper}>
          {errorValidation.imageText}
        </HelperText>
        <ProfileTextInput
          placeholder="Enter Title of your story"
          onChangeText={e =>
            setNewStory({
              ...newStory,
              title: e,
            })
          }
          value={newStory.title}
        />
        <HelperText
          type="error"
          visible={errorValidation.titleVisible}
          padding="none"
          style={styles.helper}>
          {errorValidation.titleText}
        </HelperText>
        <View style={[styles.storyInput, {borderColor: theme.colors.outline}]}>
          <TextInput
            style={[styles.description, {borderColor: theme.colors.outline}]}
            multiline={true}
            placeholder="let them know about Your Story..."
            value={newStory.description}
            onChangeText={e =>
              setNewStory({
                ...newStory,
                description: e,
              })
            }
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingRight: 15,
          }}>
          <HelperText
            type="error"
            visible={errorValidation.descriptionVisible}
            padding="none"
            style={styles.helper}>
            {errorValidation.descriptionText}
          </HelperText>
          <HelperText
            type="info"
            visible={true}
            padding="none"
            style={styles.helper}>
            {newStory.description.length}/999
          </HelperText>
        </View>
      </Block>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Upload Image</Dialog.Title>
          <Dialog.Content>
            <Text>Upload an Image to added to your Story</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={openCamera}>Open Camera</Button>
            <Button onPress={openGallery}>Upload From Gallery</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default CreateStories;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginVertical: '10%',
    marginHorizontal: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...fonts.headerHeading,
    marginLeft: 10,
    color: colors.white,
  },

  contanier: {
    width: 300,
    height: 300,
    borderRadius: 500,
    transform: [{scaleX: 1.5}],
    overflow: 'hidden',
    position: 'absolute',
    top: '-100%',
    left: 45,
  },
  design: {
    transform: [{scaleY: -1}, {rotate: '200 deg'}],
    position: 'absolute',
    top: -170,
    left: -190,
  },
  image: {
    height: height / 4,
    width: width * 0.8,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 2,
  },
  description: {
    marginBottom: '70%',
    marginHorizontal: '5%',
  },
  storyInput: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 10,
    maxWidth: '95%',
    alignSelf: 'center',
    width: '95%',
  },
  imageStyle: {width: '100%', height: '100%', borderRadius: 20},
  helper: {
    marginLeft: 15,
  },
});
