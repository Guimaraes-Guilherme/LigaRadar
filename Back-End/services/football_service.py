import requests
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_FOOTBALL_KEY")

BASE_URL = "https://v3.football.api-sports.io"

HEADERS = {
    "x-apisports-key": API_KEY
}

def get_matches_by_league(league_id: int, season: int):

    url = f"{BASE_URL}/fixtures"

    params = {
        "league": league_id,
        "season": datetime.now().strftime("%Y-%m-%d")
    }

    response = requests.get(url, headers=HEADERS, params=params)

    return response.json()