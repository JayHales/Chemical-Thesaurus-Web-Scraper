import elements from '../data/element-ids.json';
import { writeFileSync } from 'fs';
import react from './calculate-reaction';

export default function calculateProducts() {
    
    let brandNewEntities: number[] = [-1];

    const reactedEntities: number[] = [];

    let newElementsOnLastPass: number[] = elements;

    let depth = 0;

    while (brandNewEntities.length !== 0) {

        brandNewEntities = [];

        reactedEntities.push(...newElementsOnLastPass);

        reactedEntities.forEach(el1 => {
            newElementsOnLastPass.forEach(el2 => {
                let reactionResult = react([el1, el2]);

                if (reactionResult === [])
                    return;
                
                reactionResult.forEach(reaction => {
                    reaction.r.forEach((entity: number) => {
                        if (reactedEntities.includes(entity) || brandNewEntities.includes(entity))
                            return;

                        brandNewEntities.push(entity);
                    })
                    
                })
            });
        });

        newElementsOnLastPass = [...brandNewEntities];
        console.log('Depth: ' + depth++);
    }
    console.log(reactedEntities.length);
    writeFileSync('../src/data/product-ids.json', JSON.stringify(reactedEntities));

}
