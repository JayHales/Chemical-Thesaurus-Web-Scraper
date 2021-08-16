import calculateReaction from '../local/calculate-reaction';
import rawProductData from '../data/product-data.json';
import { IEntity } from '../client/find-product-data';
import elementIds from '../data/element-ids.json';

import http from 'http';

const productData: {[index: number]: IEntity} = rawProductData;

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url === undefined) {
        res.writeHead(404);
        res.end();
        return;
    }

    if (req.url.startsWith('/react/?r=')) {

        const reactantIds: number[] = decodeURI(req.url.split('?r=')[1]).trim().split(' ').map(s => parseInt(s));

        const matchingReactions = calculateReaction(reactantIds);

        res.writeHead(200);

        if (matchingReactions.length === 0)
            return res.end();
        
        let products = matchingReactions[Math.floor(Math.random() * matchingReactions.length)].r;

        if (products.length === 0)
            return res.end();

        return res.end(
            products.join(' ')
        );
    }
    
    if (req.url.startsWith('/data/?e=')) {
        const entityId: number = parseInt(decodeURI(req.url.split('?e=')[1]));

        console.log(entityId);

        if (Object.keys(productData).includes(entityId.toString())) {
            res.writeHead(200);

            let entityData = productData[entityId];

            let response = `${entityData.name}~${entityData.boilingPoint}~${entityData.color}~${entityData.is.join('|')}`;

            return res.end(
                response
            );
        }
    }

    if (req.url.startsWith('/root')) {
        
        return res.end(
            elementIds.join(' ')
        );

    }

    res.writeHead(404);

    return res.end();      


}).listen(8080);
