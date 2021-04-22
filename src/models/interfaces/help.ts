interface help {
  name: string;
  description?: string;
  aliases?: string[];
  category?: string;
  dmOnly?: boolean;
  guildOnly?: boolean;
  usage?: string;
}

export { help };
