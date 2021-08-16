import EntityDataPage from "./entity-data-page";
import productIds from '../data/product-ids.json';
import periodicTable from '../data/periodic-table.json';
import { writeFileSync } from "fs";

export default async function findProductData() {

    const output: {[index: number]: IEntity} = {};

    let i = 0;

    for (const id of productIds) {
        
        const dataPage = new EntityDataPage(id);

        await dataPage.populate();

        if (dataPage.name === undefined)
            throw '"Name" has remained undefined.';
        

        let color = '';
        let boilingPoint: number = 2147483647;

        for (const element of periodicTable.elements) {
            if (element.name.toLowerCase() === dataPage.name?.toLowerCase()) {
                if (element["cpk-hex"] !== null) {
                    color = element["cpk-hex"];
                    break;
                }                    
            }
        }

        if (dataPage.information !== undefined) {
            let potentialBoilingPoints = dataPage.information.match(/Boiling point = (.*){1} °C/);

            if (potentialBoilingPoints !== null) {
                boilingPoint = parseFloat(potentialBoilingPoints[1]);
            }
        }       

        const entityData: IEntity = {
            name: dataPage.name, 
            id: dataPage.id, 
            information: dataPage.information ?? '', 
            color: color, 
            boilingPoint: boilingPoint,
            is: dataPage.is ?? [],
            are: dataPage.are ?? []
        } 

        output[id] = entityData;

        i++;

        if (i % 100 === 0) {
            console.log(i);
        }

    }

    writeFileSync('../src/data/product-data.json', JSON.stringify(output));
}

export interface IEntity {
    name: string,
    id: number,
    information: string,
    color: string,
    boilingPoint: number,
    is: number[],
    are: number[]
}
