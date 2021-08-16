import httpRequest from "./http-request";
const { JSDOM } = require('jsdom');

const overrideNames: any = {
    4115: "Nihonium",
    9999: "Debug"
}

export default class EntityDataPage {

    readonly id: number;

    name: string | undefined = undefined;
    information: string | undefined = undefined;

    is: number[] | undefined = undefined;
    are: number[] | undefined = undefined;

    constructor(id: number) {

        this.id = id;

    }

    populate() {
        return new Promise<void>(async (resolve, reject) => {
            
            const httpResponse = await httpRequest('chemthes.com', '/entity_datapage.php?id=' + this.id);

            const dom = new JSDOM(httpResponse);

            const tables: any[] = [];

            const mainPage = dom.window.document.querySelector(".main_page");

            if (mainPage === null)
                return reject('Page does not contain .main_page');

            mainPage.childNodes.forEach((el: any) => {
                if (el.rows !== undefined)
                    tables.push(el);
            });

            const dataTable = tables[0];
            const inheritanceTable = tables[1];

            // Data
            this.information = dataTable.rows[2].children[1].innerHTML.replace(/<table[\s\S]*<\/table>/g, '').replace(/<br>/g, '\n').trim();
            if (this.information === 'undefined')
                return reject('Cannot find entity information');

            // Inheritance
            this.name = overrideNames[this.id] ?? inheritanceTable.rows[0].children[1].children[1].textContent.trim();
            if (this.name === undefined)
                return reject('Cannot find entity name.');
            
            this.is = [];            
            const isTable = inheritanceTable.rows[1].children[0].children[0];
            if (isTable !== undefined) {
                
                Array.from(isTable.rows).forEach((row: any) => {                        
                    let id = parseInt(row.children[0].children[1].href.split('=')[1]);
                    if (!this.is?.includes(id))
                        this.is?.push(id);  
                });
            }

            this.are = [];
            const areTable = inheritanceTable.rows[1].children[1].children[0];
            if (areTable !== undefined) {
                Array.from(areTable.rows).forEach((row: any) => {                        
                    let id = parseInt(row.children[0].children[1].href.split('=')[1]);
                    if (!this.are?.includes(id))
                        this.are?.push(id);  
                });
            }
            
            resolve();

        });
    }

}