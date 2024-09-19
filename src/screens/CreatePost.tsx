import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images, fonts} from '../constant';
import {
  Button,
  Dialog,
  HelperText,
  Portal,
  Surface,
  useTheme,
} from 'react-native-paper';
import {AuthButton, Block, Header} from '../components';
import {Location1, Pictures, Smile} from '../../assets/svg';
import {CreatePostNavigationType} from '../Types/NavigationTypes.types';
import {formatDate} from '../utils/date';
import {useUserContext} from '../context/UserContex';
import ImagePicker from 'react-native-image-crop-picker';
import {newPost} from '../Types/PostTypes.types';
import {useLoadingContext} from '../context/LoadingContext';
import {addPostToFirestore} from '../services/Post';
import Toast from 'react-native-toast-message';
const {width, height} = Dimensions.get('window');
const CreatePost: React.FunctionComponent<CreatePostNavigationType> = ({
  navigation,
}) => {
  const theme = useTheme();
  const user = useUserContext();
  const [errorValidation, setErrorValidation] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<newPost>({
    text: '',
    images: undefined,
  });
  const {loading, setLoading} = useLoadingContext();
  const [visible, setVisible] = useState<boolean>(false);
  const hideDialog = () => setVisible(false);
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        setNewPost({
          ...newPost,
          images: image.path,
        });
      })
      .catch(error => console.log(error))
      .finally(() => setVisible(false));
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        setNewPost({
          ...newPost,
          images: image.path,
        });
      })
      .catch(error => console.log(error))
      .finally(() => setVisible(false));
  };

  const handlePost = () => {
    if (newPost.text === '' && newPost.images === undefined) {
      setErrorValidation(true);
      return;
    }
    setLoading(true);
    addPostToFirestore(newPost.images, newPost.text, user.user)
      .then(res => {
        Toast.show({
          type: 'tomatoToast',
          text1:
            'Post Added Successfully! You will be able to see your story shortly.',
        });
        navigation.goBack();
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    if (newPost.text !== '' || newPost.images !== undefined) {
      setErrorValidation(false);
      return;
    }
  }, [newPost]);

  return (
    <>
      <Block>
        <Header title="Create Your Post" backButton={true} />
        <View style={styles.headerContanier}>
          <Image
            source={
              user.user?.photoURL
                ? typeof user.user?.photoURL === 'number'
                  ? user.user?.photoURL
                  : {uri: user.user?.photoURL}
                : images.profileImage
            }
            style={styles.profileImage}
          />
          <View>
            <Text style={[styles.nameText, {color: theme.colors.scrim}]}>
              {user.user?.displayName}
            </Text>
            <Text
              style={[styles.timeText, {color: theme.colors.outlineVariant}]}>
              {formatDate(Date.now() / 1000)}
            </Text>
          </View>
        </View>
        <Surface
          style={[
            styles.textInputContanier,
            {backgroundColor: theme.colors.onSecondary},
          ]}
          elevation={2}>
          <TextInput
            multiline
            placeholder="Type something here..."
            selectionColor={theme.colors.primary}
            placeholderTextColor={theme.colors.outlineVariant}
            style={styles.textInput}
            onChangeText={e =>
              setNewPost({
                ...newPost,
                text: e,
              })
            }
            value={newPost.text}
          />
          {newPost.images && (
            <Image source={{uri: newPost.images}} style={styles.image} />
          )}
        </Surface>
        <HelperText
          type="error"
          visible={errorValidation}
          padding="none"
          style={styles.helper}>
          Can not post Empty Post
        </HelperText>
        <Surface
          style={[
            styles.iconsContanier,
            {backgroundColor: theme.colors.onSecondary},
          ]}
          elevation={2}>
          <Text style={styles.textInput}>Add to your post</Text>
          <View style={styles.icon}>
            <Pressable onPress={() => setVisible(true)}>
              <Pictures />
            </Pressable>
            <Location1 />
            <Smile />
          </View>
        </Surface>
        <AuthButton heading="Post" onPress={handlePost} />
      </Block>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Upload Image</Dialog.Title>
          <Dialog.Content>
            <Text>Upload an Image to added to your Post</Text>
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

export default CreatePost;

const styles = StyleSheet.create({
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nameText: {
    ...fonts.postName,
    marginHorizontal: 15,
  },
  timeText: {
    ...fonts.TouchableText,
    marginLeft: 15,
  },
  headerContanier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    marginTop: 20,
  },
  textInput: {
    ...fonts.TouchableText,
  },
  textInputContanier: {
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  iconsContanier: {
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 100,
  },
  helper: {
    marginLeft: 20,
  },
  image: {height: 300, width: width * 0.85, borderRadius: 20},
});
