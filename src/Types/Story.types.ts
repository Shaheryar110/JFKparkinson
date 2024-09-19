
import firestore from '@react-native-firebase/firestore';
export type newStoryType={
    image: string | undefined,
    title:string,
    description:string,
}

export type GetStoryDataType={
    description: string;
image: string |number;
timestamp:{nanoseconds:number,seconds:number};
title:string;
userName:string;
userProfileImage:string  |number;
}