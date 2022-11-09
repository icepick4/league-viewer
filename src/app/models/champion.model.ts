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
        public currentSkin: number,
        public loaded: boolean
    ) {}

    changeSkinRight(): void {
        if (this.currentSkin < this.skins.length - 1) {
            this.currentSkin++;
        } else {
            this.currentSkin = 0;
        }
    }

    changeSkinLeft(): void {
        if (this.currentSkin > 0) {
            this.currentSkin--;
        } else {
            this.currentSkin = this.skins.length - 1;
        }
    }
}
