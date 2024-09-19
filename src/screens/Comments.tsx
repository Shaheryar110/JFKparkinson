import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Block, CommentsCard, Header, PostCard} from '../components';
import {fonts} from '../constant';
import {useTheme} from 'react-native-paper';
import {CommentsNavigationType} from '../Types/NavigationTypes.types';

const Comments: React.FunctionComponent<CommentsNavigationType> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const item = route.params?.details;
  return (
    <Block>
      <Header title="Comments" backButton={true} />
      <PostCard
        userName={item.userName}
        userProfileImage={item?.userProfileImage ? item.userProfileImage : ''}
        time={item.timestamp.seconds}
        text={item.text}
        comments={item.comments}
        likes={item.likes}
        image={item.image}
      />
      <Text style={styles.share}>250 shares</Text>
      <Text style={[styles.text, {color: theme.colors.scrim}]}>Comments</Text>
      <CommentsCard />
    </Block>
  );
};

export default Comments;

const styles = StyleSheet.create({
  text: {
    ...fonts.AuthHeading,
    marginHorizontal: 10,
    opacity: 0.9,
  },
  share: {
    ...fonts.placeholderText,
    marginHorizontal: 10,
  },
});
