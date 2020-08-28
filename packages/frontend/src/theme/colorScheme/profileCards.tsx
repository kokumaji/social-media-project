import { CardScheme } from "../../types/Theme";

export const getColorScheme = (name: string): CardScheme => {
    if(name === 'mintedGreen') {
        return mintedGreen;
    } else if(name === 'cottonCandy') {
        return cottonCandy;
    } else if(name === 'freshPeach') {
        return freshPeach;
    } else if(name === 'summerSunset') {
        return summerSunset;
    }else if(name === 'clearOcean') {
        return clearOcean;
    }
    return mintedGreen;
};

export const mintedGreen: CardScheme = {
    name: 'Minted Green',
    cardBackground: '#8fbbaf',
    cardBannerBg: '#557d68',
    cardText: '#557d68',
    cardUserText: '#557d68'
}

export const cottonCandy: CardScheme = {
    name: 'Cotton Candy',
    cardBackground: '#bd83ce',
    cardBannerBg: '#f7e8f6',
    cardText: '#f1c6e7',
    cardUserText: '#e5b0ea'
}

export const clearOcean: CardScheme = {
    name: 'Clear Ocean',
    cardBackground: '#71a0a5',
    cardBannerBg: '#cbf1f5',
    cardText: '#a6e3e9',
    cardUserText: '#8fbbaf'
}

export const freshPeach: CardScheme = {
    name: 'Fresh Peach',
    cardBackground: '#f3cfc0',
    cardBannerBg: '#eaa285',
    cardText: '#be7575',
    cardUserText: '#c4a295'
}

export const summerSunset: CardScheme = {
    name: 'Summer Sunset',
    cardBackground: '#6c567b',
    cardBannerBg: '#c06c84',
    cardText: '#f67280',
    cardUserText: '#c06c84'
}
