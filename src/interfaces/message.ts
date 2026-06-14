import { MessageType } from '../enums/MessageType';

export interface Message {
  id: number;
  type: MessageType;
  text: string;
}