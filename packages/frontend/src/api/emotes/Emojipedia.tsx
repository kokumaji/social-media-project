import activities from "./data/activities.json";
import emoticons from "./data/emoticons.json";
import flags from "./data/flags.json";
import food from "./data/food.json";
import nature from "./data/nature.json";
import objects from "./data/objects.json";
import people from "./data/people.json";
import symbols from "./data/symbols.json";
import travel from "./data/travel.json";

const allEmotes: any = {...activities, ...emoticons, ...flags, ...food, ...nature, ...objects, ...people, ...symbols, ...travel};

export const get = (str: string) => {
    for(let emote in allEmotes) {
        if(emote === str) return allEmotes[emote];
    }

    return str;
} 