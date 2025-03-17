export interface ChatInterface {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  messagesCount: number;
  createdAt: Date | number | undefined;
  updatedAt: Date | number | undefined;
  messages: IMessage[] | [] | undefined;
}

export interface IMessage {
  id: number;
  question: string;
  answer: string;
  createdAt: Date;
  chatId: number;
}
