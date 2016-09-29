import { CerberusPage } from './app.po';

describe('cerberus App', function() {
  let page: CerberusPage;

  beforeEach(() => {
    page = new CerberusPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
