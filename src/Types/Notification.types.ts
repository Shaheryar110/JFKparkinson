export type GetNotification={
    id:string;
    body:string;
    title:string;
    userId:string;
    docId:string;
    createdAt:{nanoseconds:number,seconds:number};

}