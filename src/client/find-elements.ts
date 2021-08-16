import { writeFileSync } from "fs";
import EntityDataPage from "./entity-data-page";

const ignoreIds = [
    2553, // Red P
    2454, // Rhombic S
    3463, // dU
]

export default async function findElements() {

    const genericGroups = [3812, 3813, 3814, 3815, 3816, 3817, 3818, 3810, 3811, 2737];

    const unreferened = [4155]; // Nh

    // 3811 = Actinidies
    // 3812 = Lanth
    // 3813 = Period 1
    // ...
    // 3818 = Period 7 
    // 2737 = Metallic

    let allElementIds: number[] = [];

    for (let i of genericGroups) {
        let e = new EntityDataPage(i);
        
        await e.populate();

        if (e.are === undefined)
            return;

        console.log(e.are);

        e.are?.forEach(a => {
            if (!allElementIds.includes(a) && !ignoreIds.includes(a))
            allElementIds.push(a);
        });
    }

    allElementIds.push(...unreferened);

    if (allElementIds.length !== 118)
        throw 'Did not find 188 elements. Found ' + allElementIds.length;
    
    console.log('Found 118 elements.');

    writeFileSync('../src/data/element-ids.json', JSON.stringify(allElementIds));
    

} 