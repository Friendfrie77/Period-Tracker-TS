interface valuesTypes{
    email?: string, 
    username?: string,
    password?: string,
    passwordConfirm?: string
    oldPassword?: string,
    file?:File|FileList
}
type functionType = {
    modalFunction: () =>void;
}
export type {valuesTypes, functionType}