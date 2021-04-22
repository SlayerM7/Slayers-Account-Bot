interface run {
  name: String;
  aliases: String[];
  permissions?: String[];
  guildOnly?: Boolean;
  dmOnly?: Boolean;
  allowEveryone: Boolean;
  run: Function;
}

export { run };
