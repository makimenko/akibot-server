export interface MessageRawData {
    msgType: string;
    msgBody: Message
}

export interface Message {

}

export interface HelloMessage extends Message {
    myName: string;
}
