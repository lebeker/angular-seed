import { browser, element, by } from 'protractor';

describe('Home', () => {

  beforeEach(async () => {
    return await browser.get('/');
  });

  it('should have an input', () => {
    expect(element(by.css('sd-home form input')).isPresent()).toEqual(true);
  });

  it('should have a list of computer scientists', () => {
    expect(element(by.css('sd-home ul')).getText())
      .toMatch('Edsger Dijkstra');
  });

  it('should add a name to the list using the form', () => {
    let newVal = 'Tim Berners-Lee' + (new Date()).toTimeString().replace(/[\(\)\+]/g, '');
    element(by.css('sd-home form input')).sendKeys(newVal);
    element(by.css('sd-home form button')).click();

    let txt = element(by.css('sd-home ul')).getText();
    expect(txt).toMatch('Edsger Dijkstra');
    expect(txt).toMatch(newVal);
  });

});
