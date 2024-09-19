export type newPost={
    text: string;
    images: string| undefined;
}


export type GetPostDataType={
    comments: number; 
    image:string; 
    likes: number; 
    shares: number;
    text: string;
    timestamp:{nanoseconds:number,seconds:number};
    userName: string;
    userProfileImage: string | undefined;
    userUid: string
}