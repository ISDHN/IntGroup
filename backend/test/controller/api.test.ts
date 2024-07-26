import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework, Application } from '@midwayjs/koa';
import 'jest';

describe('test/controller/home.test.ts', () => {

  let app: Application;

  beforeAll(async () => {
    // 只创建一次 app，可以复用
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    // close app
    await close(app);
  });

  it('should POST /api/user/info', async () => {
    const result = await createHttpRequest(app).post('/api/user/info/0')

    expect(result.status).toBe(200);
    expect(result.body.username).toBe("Ivy");
    expect(result.body.avatar).toBe("https://img.moegirl.org.cn/common/thumb/7/73/D_Ivy.png/450px-D_Ivy.png");
  });

  it('should POST /api/user/ints', async () => {
    const result = await createHttpRequest(app).post('/api/user/ints/0').query({ start: 0, end: 5 })

    expect(result.status).toBe(200);
    expect(result.body).toStrictEqual([0, 2, 5, 6, 7])
  });
});
