# Installation

```bash
npm install jwt-parse
```

or

```bash
yarn add jwt-parse
```

**IMPORTANT**: This library doesn't validate the token, any well formed JWT can be decoded. You should validate the token in your server-side logic by using something like express-jwt, koa-jwt, Owin Bearer JWT, etc.
