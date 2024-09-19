import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {images} from '../constant';

type Props = {
  onPress: () => void;
  source: string;
};
const ProfilePicture: React.FunctionComponent<Props> = ({onPress, source}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Image
        style={styles.profilePicture}
        source={
          source
            ? typeof source === 'number'
              ? source
              : {uri: source}
            : images.profileImage
        }
      />
    </TouchableOpacity>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
