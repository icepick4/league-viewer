export type Language = {
    name: string;
    code: string;
    charged: boolean;
    sliced_code: string;
};

export const languagesNames: { [key: string]: string } = {
    en_US: 'English',
    cs_CZ: 'Čeština',
    de_DE: 'Deutsch',
    el_GR: 'Ελληνικά',
    en_AU: 'English (Australia)',
    en_GB: 'English (United Kingdom)',
    en_PH: 'English (Philippines)',
    en_SG: 'English (Singapore)',
    es_AR: 'Español (Argentina)',
    es_ES: 'Español (España)',
    es_MX: 'Español (México)',
    fr_FR: 'Français',
    hu_HU: 'Magyar',
    id_ID: 'Bahasa Indonesia',
    it_IT: 'Italiano',
    ja_JP: '日本語',
    ko_KR: '한국어',
    pl_PL: 'Polski',
    pt_BR: 'Português (Brasil)',
    ro_RO: 'Română',
    ru_RU: 'Русский',
    th_TH: 'ไทย',
    tr_TR: 'Türkçe',
    vn_VN: 'Tiếng Việt',
    zh_CN: '简体中文',
    zh_MY: '简体中文 (马来西亚)',
    zh_TW: '繁體中文',
};
