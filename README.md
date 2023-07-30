# `easy-push` typescript client SDK

## Installation

```bash
npm install --save @easy-push/ts-client
```

## Usage

```javascript
import EasyPushClient from '@easy-push/ts-client';

const client = EasyPushClient("http://localhost:8080", "my-secret-key");
const channel = client.getChannel("my-channel");

client.subscribeToChannel(channel, (message) => {
    console.log(message);
});
```
