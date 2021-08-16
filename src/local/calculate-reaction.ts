import { match } from 'assert';
import reactionIds from '../data/reaction-ids.json';
import { IReaction } from '../client/find-reactions';


export default function calculateReaction(reactants: number[]): IReaction[] {
    reactants.sort((a, b) => a - b);

    const matches: IReaction[] = [];

    for (const _reaction of Object.values(reactionIds)) {
        
        const reaction = _reaction as IReaction;

        if (reaction.l.length !== reactants.length)
            continue;
    
        let shouldContinue = false;
        for (let i = 0; i < reactants.length; i++) {
            if (reaction.l[i] !== reactants[i]) {
                shouldContinue = true;
                break;
            }                
        }

        if (shouldContinue)
            continue;

        matches.push(reaction);
    }

    return matches;
}   