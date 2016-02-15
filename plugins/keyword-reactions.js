const _ = require('lodash');
const config = require('config');
const slackAPI = require('../lib/slack-api');

const wordToEmoji = config.plugins["keyword-reactions"].keywords;

module.exports = {
  regex: /.*/,

  fn(message) {
    if (!message.text) return null;

    const text = message.text;

    _.forIn(wordToEmoji, (emoji, word) => {
      var isFound = text.indexOf(word);
      if (isFound < 0) return;

      slackAPI.reactions.add(emoji, {
        channel: message.channel,
        timestamp: message.ts
      });
    });
  }
};