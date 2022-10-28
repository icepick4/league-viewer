export type Skin = {
    id: number;
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
        public skins: Skin[],
        public nbSkins: number
    ) {}
}
