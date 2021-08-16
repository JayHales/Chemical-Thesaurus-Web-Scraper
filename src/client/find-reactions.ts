import httpRequest from './http-request'
import { writeFileSync } from 'fs';
const { JSDOM } = require("jsdom");

const hardErrors: number[] = [184, 1571, 1572, 1623, 2453, 2479, 2589];

const output: {[index: number] : IReaction} = {};

export default async function findReactions() {


    for (let i = 1; i <= 4161; i++) {

        if (hardErrors.includes(i))
            continue;

        const httpResponse = await httpRequest('chemthes.com', '/rxn_dp.php?id=' + i);

        try {
            scrapeData(httpResponse, i);
        }
        catch (e) {
            throw '[' + i + '] \n\n' + e;
        }
        

        if (i % 100 === 0)
            console.log(i);
    }

    writeFileSync('../src/data/reaction-ids.json', JSON.stringify(output));
}

function scrapeData(document: string, rxId: number) {

    const dom = new JSDOM(document);

    const tables: any[] = [];
    const mainPage = dom.window.document.querySelector(".main_page");

    if (mainPage === null)
        throw('Page does not contain .main_page');

    mainPage.childNodes.forEach((el: any) => {
        if (el.rows !== undefined)
            tables.push(el);
    });

    let reactionTable = tables[1];

    let LHS: number[] = [];
    let RHS: number[] = [];

    let shouldGoToL = true;
    let header = true;

    let arrowType: number = -1;

    Array.from(reactionTable.rows).forEach((el: any) => {

        if (header) {
            header = false;
            return;
        }

        let child = el.childNodes[0].childNodes[0];

        if (child === undefined) {
            arrowType = parseInt(el.childNodes[1].childNodes[0].src.split('icon_3/')[1].replace('.png', ''));
            shouldGoToL = false;
            return;
        }            

        let elId = parseInt(child.href.split('=')[1]);

        if (shouldGoToL)
            LHS.push(elId);
        else   
            RHS.push(elId);
    });

    if (LHS === [] || RHS === [] || arrowType === -1) {
        return console.log('Data unset at ID ' + rxId);
    }
    
    output[rxId] = {l: LHS.sort((a, b) => a - b), r: RHS.sort((a, b) => a - b), a: arrowType};
}   

export interface IReaction {
    l: number[]
    a: number,
    r: number[]
}