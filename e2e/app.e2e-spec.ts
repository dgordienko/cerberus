import { CerberusDesignPage } from './app.po';

describe('cerberus-design App', function() {
  let page: CerberusDesignPage;

  beforeEach(() => {
    page = new CerberusDesignPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
