import { EDMAPage } from './app.po';

describe('edma App', () => {
  let page: EDMAPage;

  beforeEach(() => {
    page = new EDMAPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
