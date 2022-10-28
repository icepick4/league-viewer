"""first test file"""


import json

import requests

URL = 'http://ddragon.leagueoflegends.com/cdn/12.20.1/data/fr_FR/champion/'

response = requests.get(URL, timeout=10)

skins = response.json()['data']['Gangplank']['skins']
print(json.dumps(skins, indent=4, ensure_ascii=False))
print(f"Il y a {len(skins)} skins pour Gangplank, voici les splash arts :")
gangplank_skins = [
    'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/'
    f'Gangplank_{skins[i]["num"]}.jpg' for i in range(len(skins))]
for img in gangplank_skins:
    print(img)

lore = response.json()['data']['Gangplank']['lore']
print(f"Le lore de Gangplank est : \n{lore}")
