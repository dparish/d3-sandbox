import { D3ExamplesPage } from './app.po';

describe('d3-examples App', function() {
  let page: D3ExamplesPage;

  beforeEach(() => {
    page = new D3ExamplesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
