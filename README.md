# `easy-push` typescript client SDK

## Installation

```bash
npm install --save @easy-push/ts-client
```

## Usage

```javascript
import EasyPushClient from '@easy-push/ts-client';

const client = new EasyPushClient("https://easy-push-api.sayanbiswas.in", "meow", "uwu");
const channel = client.getChannel(5);

client.subscribeToChannel(5, (message) => {
    console.log(message);
});
```
