
export type newNotesType={
    title:string,
    description:string,
}

export type GetNotesDataType={
    description: string;
    createdAt:{nanoseconds:number,seconds:number};
title:string;
userUid:string
}