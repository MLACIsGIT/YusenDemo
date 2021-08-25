export default class LanguageElementsHandler {
    constructor(languageElements, currentLanguage) {
        this.languageElements = languageElements;
        this.currentLanguage = currentLanguage;
    }

    get(key) {
        let element = this.languageElements?.['items']?.[key]?.[this.currentLanguage];
        return element === undefined ? `###_${key}` : element;
      }      
}
