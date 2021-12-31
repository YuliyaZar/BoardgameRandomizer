import bggXmlApiClient, { getBggCollection, getBggThing } from 'bgg-xml-api-client';
const { data } = await getBggCollection({ username: process.argv[3] });
//Create variable with all of Eugene's games and their info
const ids = []
for (let i = 0; i < data.item.length; i++) {
    ids.push(data.item[i].objectid)
}
const { data: data2 } = await getBggThing({ id: ids.join(',') });
//Create filtered variable with games in Eugene's collection that meet player criteria
let num_players = process.argv[2]
let filtered_games = []
let filtered_playingtime = []
for (let i = 0; i < data2.item.length; i++) {
    if (data2.item[i].maxplayers.value >= num_players && data2.item[i].minplayers.value <= num_players) {
        filtered_games.push(Array.isArray(data2.item[i].name) ? data2.item[i].name[0].value : data2.item[i].name.value)
        filtered_playingtime.push(data2.item[i].playingtime.value)
    }
}
//Choose random game from filter variable
let random = Math.floor(Math.random() * (filtered_games.length - 1))
let game_to_play = filtered_games[random]
let playingtime = filtered_playingtime[random]
//Output random game to play from Eugene's collection that meets player criteria
console.log("Play: " + game_to_play + " for " + playingtime + " minutes!")