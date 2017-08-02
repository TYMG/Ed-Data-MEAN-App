import { EdDataMeanAppPage } from './app.po';

describe('ed-data-mean-app App', () => {
  let page: EdDataMeanAppPage;

  beforeEach(() => {
    page = new EdDataMeanAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
