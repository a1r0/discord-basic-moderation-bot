# Discord Message Mover Bot

This Discord bot allows you to move the last **N** messages from one text channel to another using a slash command. This functionality is useful for managing channels, cleaning up discussions, or reorganizing content in a Discord server.

## Features

- **Move Messages:** Move the last `N` messages from the current channel to a target channel.
- **Slash Command Integration:** The bot uses Discord's slash commands for ease of use.
- **Message Deletion:** Optionally deletes the original messages from the source channel after moving them to the target channel.

## Commands

### `/moveposts`


- **Description:** Moves the last `N` messages from the current channel to a specified target channel.
  
- **Parameters:**
  - `message_amount` (required): The number of messages you want to move.
  - `channel` (required): The target channel where the messages should be moved.

### Example Usage:
In this example, the last 10 messages from the current channel will be moved to the `#general` channel, and the messages will be deleted from the original channel.

### Prerequisites

- Node.js (v20.18.0 or higher)
- Discord.js library (v14.16.3)
- A Discord bot with the following permissions:
  - `SEND_MESSAGES`
  - `READ_MESSAGE_HISTORY`
  - `MANAGE_MESSAGES`

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/discord-message-mover-bot.git
   cd discord-message-mover-bot```
2. Install the necessary dependencies:
```npm install```

3. Create a .config file in the root of your project and add your bot token:

```javascript
{
    "token": "{yourbot-token}",
}
```

4. Run the bot
   ```node index.js