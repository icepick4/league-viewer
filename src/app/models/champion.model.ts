export type Skin = {
    num: number;
    name: string;
    splashPath: string;
    chromas: boolean;
};

export class Champion {
    constructor(
        public id: number,
        public name: string,
        public lore: string,
        public mainImage: string,
        public icon: string,
        public skins: Skin[],
        public nbSkins: number,
        public currentSkin: number,
        public show: boolean
    ) {}
}
