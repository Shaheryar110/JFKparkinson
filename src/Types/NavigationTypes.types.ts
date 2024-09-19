import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { GetMeetingResponse } from "../services/meetings";
import { GetPostDataType } from "./PostTypes.types";
import { GetArticalResponse } from "./Articals";
export type RootStackParamsApp={
    
    Home:any;
    BottomTab:any;
    Onboarding:any;
    EventDetails:{ id:string};
    Profile:any;
    CreateStory:any;
    Story:{
        heading:string;
        userProfileImage:string | number;
        userName:string;
        date:string;
        description:string;
        image:string | number;
    };
    Comments:{details:GetPostDataType};
    Notifications:any;
    TermsAndConditions:any;
    PrivacyPolicy:any;
    ZoomRecordings:any;
    Articles:any;
    Article:{details:GetArticalResponse};
    SupportsGroup:any;
    PeopleInTheNews:any;
    LatestNews:any
    Events:any;
    CreatePost:any;
    Stories:any;
    Post:any;
    Notes:any;
    CreateNote:any;
}

export type RootBottomTabParams={
    Events:any;
    Post:any;
    Home:any;
    Consultation:any;
    Stories:any;
    EventDetails:{ id:string};
    Comments:{details:GetPostDataType};
    CreateStory:any;
    Story:{
        heading:string;
        userProfileImage:string | number;
        userName:string;
        date:string;
        description:string;
        image:string | number;
    };
    Notifications:any;
    CreatePost:any;
   

}

export type RootStackParamsAuth={
    SignUp: any;
    SignIn: any;
    ForgetPassword: any;
    TermsAndConditions:any;
    PrivacyPolicy:any;
}

//AppNavigator Screens
export type HomeNavigationType = NativeStackScreenProps<RootStackParamsApp, 'Home'>;
export type BottomTabNavigationType = NativeStackScreenProps<RootStackParamsApp, 'BottomTab'>;
export type OnboardingNavigationType = NativeStackScreenProps<RootStackParamsApp, 'Onboarding'>;
export type EventDetailsNavigationType = NativeStackScreenProps<RootStackParamsApp, 'EventDetails'>;
export type ProfileNavigationType = NativeStackScreenProps<RootStackParamsApp, 'Profile'>;
export type CreateStoryNavigationType = NativeStackScreenProps<RootStackParamsApp, 'CreateStory'>;
export type StoryNavigationType = NativeStackScreenProps<RootStackParamsApp, 'Story'>;
export type CommentsNavigationType = NativeStackScreenProps<RootStackParamsApp, 'Comments'>;
export type NotificationsNavigationType = NativeStackScreenProps<RootStackParamsApp, 'Notifications'>;
export type ArticlesNavigationType = NativeStackScreenProps<RootStackParamsApp, 'Articles'>;
export type ArticleNavigationType = NativeStackScreenProps<RootStackParamsApp, 'Article'>;
export type CreatePostNavigationType = NativeStackScreenProps<RootStackParamsApp, 'CreatePost'>;
export type NotesNavigationType = NativeStackScreenProps<RootStackParamsApp, 'Notes'>;
export type CreateNoteNavigationType = NativeStackScreenProps<RootStackParamsApp, 'CreateNote'>;

//Bottom Tab Screens
export type EventsNavigationType = BottomTabScreenProps<RootBottomTabParams, 'Events'>;
export type PostNavigationType = BottomTabScreenProps<RootBottomTabParams, 'Post'>;
export type ConsultationNavigationType = BottomTabScreenProps<RootBottomTabParams, 'Consultation'>;
export type StoriesNavigationType = BottomTabScreenProps<RootBottomTabParams, 'Stories'>;

//AuthenticationScreens
export type SignUpNavigationType = NativeStackScreenProps<RootStackParamsAuth, 'SignUp'>;
export type SignInNavigationType = NativeStackScreenProps<RootStackParamsAuth, 'SignIn'>;
export type ForgetPasswordNavigationType = NativeStackScreenProps<RootStackParamsAuth, 'ForgetPassword'>;

