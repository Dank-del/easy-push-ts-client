# `easy-push` typescript client SDK

## Installation

```bash
npm install --save @easy-push/ts-client
```

## Usage

```javascript
import EasyPushClient from '@easy-push/ts-client';

const client = EasyPushClient("http://localhost:8080", "my-secret-key");
const channel = client.getChannel(5);

client.subscribeToChannel(5, (message) => {
    console.log(message);
});
```
