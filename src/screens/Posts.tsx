import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, Loading, PostCard} from '../components';
import {useNavigation} from '@react-navigation/native';
import {PostNavigationType} from '../Types/NavigationTypes.types';
import {AnimatedFAB, useTheme} from 'react-native-paper';
import {Add} from '../../assets/svg';
import {getPost} from '../services/Post';
import {GetPostDataType} from '../Types/PostTypes.types';
type ScrollViewNativeEvent = NativeSyntheticEvent<NativeScrollEvent>;
const Posts: React.FunctionComponent<PostNavigationType> = () => {
  const navigation = useNavigation<PostNavigationType['navigation']>();
  const theme = useTheme();
  const [isExtended, setIsExtended] = React.useState(true);
  const [posts, setPost] = useState<GetPostDataType[] | []>();
  const onScroll = (nativeEvent: ScrollViewNativeEvent) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  useEffect(() => {
    getPost().then(post => setPost(post));
  }, []);
  return (
    <>
      <Header title="Posts" />
      <FlatList
        data={posts}
        onScroll={onScroll}
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.timestamp}-${item.userUid}`}
        renderItem={({item, index}) => (
          <PostCard
            onPress={() => navigation.navigate('Comments', {details: item})}
            userName={item.userName}
            userProfileImage={
              item?.userProfileImage ? item.userProfileImage : ''
            }
            time={item.timestamp.seconds}
            text={item.text}
            comments={item.comments}
            likes={item.likes}
            image={item.image}
          />
        )}
        ListEmptyComponent={() => <Loading />}
      />

      <AnimatedFAB
        icon={props => <Add />}
        label="Create a Post?"
        extended={isExtended}
        onPress={() => navigation.navigate('CreatePost')}
        visible={true}
        animateFrom="right"
        iconMode="static"
        style={[styles.fabStyle, {backgroundColor: theme.colors.tertiary}]}
      />
    </>
  );
};

export default Posts;

const styles = StyleSheet.create({
  fabStyle: {
    bottom: 20,
    right: 16,
    position: 'absolute',
    justifyContent: 'space-between',
  },
});
