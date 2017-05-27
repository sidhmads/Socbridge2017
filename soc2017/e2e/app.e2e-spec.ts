import { Soc2017Page } from './app.po';

describe('soc2017 App', () => {
  let page: Soc2017Page;

  beforeEach(() => {
    page = new Soc2017Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
