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
    return defaultDark;
};

export const defaultLight: CardScheme = {
    name: 'Default Light',
    cardBackground: 'white',
    cardBannerBg: '#9fa1a5',
    cardText: 'black',
    cardUserText: '#9fa1a5',
    cardActionColor: 'filter: invert(73%) sepia(2%) saturate(422%) hue-rotate(182deg) brightness(88%) contrast(90%);'
};

export const defaultDark: CardScheme = {
    name: 'Default Dark',
    cardBackground: '#363f44',
    cardBannerBg: '#9fa1a5',
    cardText: 'white',
    cardUserText: '#9fa1a5',
    cardActionColor: 'filter: invert(73%) sepia(2%) saturate(422%) hue-rotate(182deg) brightness(88%) contrast(90%);'
};

export const mintedGreen: CardScheme = {
    name: 'Minted Green',
    cardBackground: '#8fbbaf',
    cardBannerBg: '#557d68',
    cardText: '#557d68',
    cardUserText: '#557d68',
    cardActionColor: 'filter: invert(45%) sepia(37%) saturate(322%) hue-rotate(96deg) brightness(91%) contrast(82%);'
}

export const cottonCandy: CardScheme = {
    name: 'Cotton Candy',
    cardBackground: '#bd83ce',
    cardBannerBg: '#f7e8f6',
    cardText: '#f1c6e7',
    cardUserText: '#e5b0ea',
    cardActionColor: 'filter: invert(98%) sepia(31%) saturate(454%) hue-rotate(270deg) brightness(97%) contrast(99%);'
}

export const clearOcean: CardScheme = {
    name: 'Clear Ocean',
    cardBackground: '#71a0a5',
    cardBannerBg: '#cbf1f5',
    cardText: '#a6e3e9',
    cardUserText: '#8fbbaf',
    cardActionColor: 'filter: invert(97%) sepia(69%) saturate(654%) hue-rotate(163deg) brightness(101%) contrast(92%);'
}

export const freshPeach: CardScheme = {
    name: 'Fresh Peach',
    cardBackground: '#f3cfc0',
    cardBannerBg: '#eaa285',
    cardText: '#be7575',
    cardUserText: '#c4a295',
    cardActionColor: 'filter: invert(96%) sepia(84%) saturate(2505%) hue-rotate(298deg) brightness(96%) contrast(90%);'
}

export const summerSunset: CardScheme = {
    name: 'Summer Sunset',
    cardBackground: '#6c567b',
    cardBannerBg: '#c06c84',
    cardText: '#f67280',
    cardUserText: '#c06c84',
    cardActionColor: 'filter: invert(54%) sepia(9%) saturate(1859%) hue-rotate(292deg) brightness(90%) contrast(95%);'
}
