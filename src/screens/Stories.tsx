import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AnimatedFAB, useTheme} from 'react-native-paper';
import {colors, fonts} from '../constant';
import {Add, Design, DrawerIcon, NotificationIcon} from '../../assets/svg';
import {useDrawerContext} from '../context/DrawerContex';
import {Loading, StoryCard} from '../components';
import {StoriesNavigationType} from '../Types/NavigationTypes.types';
import {getAllStories} from '../services/Story';
import {GetStoryDataType} from '../Types/Story.types';
import {formatDate} from '../utils/date';
const {width, height} = Dimensions.get('window');
type ScrollViewNativeEvent = NativeSyntheticEvent<NativeScrollEvent>;
const Stories: React.FunctionComponent<StoriesNavigationType> = ({
  navigation,
}) => {
  const theme = useTheme();
  const {setIsOpen} = useDrawerContext();
  const [isExtended, setIsExtended] = React.useState(true);
  const [stories, setStories] = useState<GetStoryDataType[] | []>([]);
  const onScroll = (nativeEvent: ScrollViewNativeEvent) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  useEffect(() => {
    getAllStories().then((data: GetStoryDataType[] | []) => {
      setStories(data);
    });
  }, []);

  return (
    <>
      <View style={{marginBottom: 80}}>
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
              onPress={() => setIsOpen(true)}>
              <DrawerIcon width={30} height={30} />
            </TouchableOpacity>
            <Text style={styles.text}>Stories</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Notifications')}>
            <NotificationIcon
              width={30}
              height={30}
              fill={theme.colors.onSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView onScroll={onScroll} showsVerticalScrollIndicator={false}>
        {stories?.length > 0 ? (
          stories?.map((story, index) => (
            <StoryCard
              key={index}
              heading={story?.title}
              userName={story?.userName}
              date={formatDate(story.timestamp.seconds)}
              source={story?.image}
              profileImage={story.userProfileImage || ''}
              onPress={() =>
                navigation.navigate('Story', {
                  heading: story?.title,
                  userName: story?.userName,
                  date: formatDate(story.timestamp.seconds),
                  description: story?.description,
                  userProfileImage: story?.userProfileImage,
                  image: story.image,
                })
              }
            />
          ))
        ) : (
          <Loading />
        )}
      </ScrollView>
      <AnimatedFAB
        icon={props => <Add />}
        label="Add your story"
        extended={isExtended}
        onPress={() => navigation.navigate('CreateStory')}
        visible={true}
        animateFrom="right"
        iconMode="static"
        style={styles.fabStyle}
      />
    </>
  );
};

export default Stories;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginVertical: '10%',
    marginHorizontal: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inner: {
    margin: 5,
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
  },
  description: {
    marginBottom: 50,
    marginHorizontal: '5%',
  },
  fabContainer: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
    justifyContent: 'space-between',
  },
});
