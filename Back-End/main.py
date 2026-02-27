from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.football_service import get_matches_by_league
from fastapi import FastAPI

app = FastAPI()

# Liberar acesso do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# IDs das ligas na API-Football
LEAGUES = {
    "brasileirao": 71,
    "premier": 39,
    "laliga": 140,
    "ligue1": 61
}



@app.get("/api/{league_name}")
def get_league_matches(league_name: str):

    league_id = LEAGUES.get(league_name)

    if not league_id:
        return {"error": "Liga não encontrada"}

    data = get_matches_by_league(league_id, 2024)

    return data

@app.get("/")
def home():
    return {"message": "API LigaRadar funcionando 🚀"}