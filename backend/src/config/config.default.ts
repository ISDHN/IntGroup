import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1721541900602_496',
  cors: {
    origin: '*',
  },
  koa: {
    port: 7001,
  },
  webSocket: {},
  upload: {
    fileSize: '1gb'
  },
  bodyParser: {
    enableTypes: ['json', 'form', 'text'],
    formLimit: '50mb',
    jsonLimit: '50mb',
    textLimit: '50mb',
  },
} as MidwayConfig;
