export interface BotResponseMessage {
  type: "bot-response";
  text: string;
}

export interface FileSuggestionsMessage {
  type: "file-suggestions";
  files: string[];
}

export type MessageFromExtension = BotResponseMessage | FileSuggestionsMessage;
