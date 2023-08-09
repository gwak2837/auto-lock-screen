# 자동 화면 지키미

웹캠으로 인식해 얼굴이 하나도 인식되지 않으면 자동으로 화면을 잠궈주는 프로젝트

### Requires

#### node-webcam

> https://www.npmjs.com/package/node-webcam

```bash
brew install imagesnap
```

#### @vladmandic/face-api

> https://github.com/Automattic/node-canvas \
> https://dev.to/kvntzn/using-face-api-in-nodejs-38aj

```bash
npm uninstall -g node-gyp
npm install -g node-gyp
brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
```

#### Install

```bash
❯ node -v
v18.17.0
```

### Start

```bash
npm i
node main.js
```
