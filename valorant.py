import requests
import mwparserfromhell

# APIエンドポイント
url = "https://liquipedia.net/valorant/api.php"

# ヘッダー設定（カスタムUser-Agentを指定）
headers = {
    "User-Agent": "hook's_localapp/1.0 (hook0726@gmail.com)",
    "Accept-Encoding": "gzip"  # gzipエンコーディングをサポート
}

# パラメータ設定
params = {
    "action": "query",
    "titles": "VCT/2024/Champions",
    "prop": "revisions",
    "rvprop": "content",
    "format": "json"
}

# APIリクエスト送信
response = requests.get(url, headers=headers, params=params)

# レスポンス確認
if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}")

import re

# Wikitext データ
wikitext = str(response.json())
# マークアップを解析
wikicode = mwparserfromhell.parse(wikitext)

