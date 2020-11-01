import WordPressMangastream from './templates/WordPressMangastream.mjs';

// Customized version of WordPressMangastream
export default class Komiku extends WordPressMangastream {

    constructor() {
        super();
        super.id = 'komiku';
        super.label = 'Komiku';
        this.tags = ['manga', 'indonesian'];
        this.url = 'https://komiku.co.id';
        this.path = '/daftar-komik/';

        this.queryMangas = 'div#a-z ol li.ranking1 h4';
        this.queryChapters = 'table.chapter tbody tr td.judulseries a';
        this.queryChaptersTitle = undefined;
        this.queryPages = 'div#Baca_Komik img[src]:not([src=""])';
    }

    async _getMangas() {
        let request = new Request(new URL(this.path, this.url), this.requestOptions);
        let data = await this.fetchDOM(request, this.queryMangas);
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element.closest('a'), request.url),
                title: element.textContent.trim()
            };
        });
    }

    async _getPages(chapter) {
        let pageList = await super._getPages(chapter);
        return pageList.filter(link => !link.endsWith('New-Project-2.jpg'));
    }
}