import { WinetrackerAppPage } from './app.po';

describe('winetracker-app App', () => {
  let page: WinetrackerAppPage;

  beforeEach(() => {
    page = new WinetrackerAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
