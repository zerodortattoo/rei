import { Game, Product, PoolPack } from './types';

export const WHATSAPP_NUMBER = "5519988292295";

export const FEATURED_GAMES: Game[] = [
  { id: 'roblox', name: 'Roblox', icon: '🧱', type: 'SandBox' },
  { id: '8ball', name: '8 Ball Pool', icon: '🎱', type: 'Sports' }, 
  { id: 'gta5', name: 'GTA V', icon: '🚗', type: 'Action' },
  { id: 'freefire', name: 'Free Fire', icon: '🔥', type: 'Mobile' },
  { id: 'fortnite', name: 'Fortnite', icon: '🔨', type: 'Shooter' },
  { id: 'valorant', name: 'Valorant', icon: '🎯', type: 'FPS' },
  { id: 'lol', name: 'League of Legends', icon: '⚔️', type: 'MOBA' },
  { id: 'cod', name: 'Call of Duty', icon: '🔫', type: 'FPS' },
  { id: 'minecraft', name: 'Minecraft', icon: '⛏️', type: 'Survival' },
  { id: 'cs2', name: 'Counter-Strike 2', icon: '💣', type: 'FPS' },
  { id: 'fifa', name: 'EA Sports FC', icon: '⚽', type: 'Sports' },
  { id: 'clash', name: 'Clash Royale', icon: '👑', type: 'Mobile' },
];

export const ALL_GAME_NAMES: string[] = [
  "#Compass", "8 Ball Pool", "99 Nights in the Forest", "Adopt Me", "Albion Online", 
  "All Star Tower Defense X", "Animal Crossing: New Horizons", "Anime Defenders", 
  "Anime Vanguards", "Apex Legends", "Arc Raiders", "Arena Breakout", "Arena Breakout: Infinite", 
  "ARK: Survival Ascended", "Arknights", "Ayakashi Rumble!", "Battlefield", "Battlenet", 
  "Black Clover M", "Black Desert Online", "Bleach: Brave Souls", "Blood Strike Accounts", 
  "Blox Fruits", "Brawl Stars", "Call of Duty Mobile", "Chaos Zero Nightmare", 
  "Chocotto Land", "Clash of Clans", "Cookie Run: Kingdom", "Crunchyroll", 
  "Dark and Darker", "DayZ", "Dead By Daylight", "Dead Rails", "Delta Force", "Destiny 2", 
  "Diablo 4", "Diablo Immortal", "Digimon Super Rumble", "Discord", "DonutSMP", "Dota 2", 
  "Dragon Ball Legends", "Dragon Ball Z Dokkan Battle", "Dragon Quest X", "Duet Night Abyss", 
  "EA Sports FC Mobile", "eFootball", "Elden Ring", "Elder Scrolls Online", "Epic Games", 
  "Epic Seven", "Escape from Tarkov", "Etheria: Restart", "Fallout 76", "Fate/Grand Order", 
  "Final Fantasy XIV", "Fisch", "Forza Horizon 5", "Genshin Impact", 
  "Girls Frontline 2: Exilium", "Goddess of Victory: Nikke", "Golden HoYeah", "Granblue Fantasy", 
  "Grow a Garden", "Hay Day", "Honkai Impact 3rd", "Honkai: Star Rail", "Houchi Shoujo", 
  "Identity V", "Jailbreak", "JoJo’s Bizarre Adventure", "Jujutsu Infinite", 
  "Jujutsu Kaisen Phantom Parade", "Kaiju No. 8", "King Legacy", "Knives Out", 
  "League of Legends: Wild Rift", "Livly Island", "Lords Mobile", "Lost Ark", 
  "Madoka Magica Magia Exedra", "Marvel Contest of Champions", "Marvel Rivals", 
  "Millennium War Aigis", "mo.co", "Mobile Legends", "Monster Hunter Now", "Monster Strike", 
  "Netflix", "New World", "One Piece Bounty Rush", "One Piece Treasure Cruise", "Origin", 
  "Overwatch 2", "Path of Exile", "Path of Exile 2", "Persona 5: The Phantom X", 
  "Plants vs Brainrots", "PlayStation", "Pokecolo", "Pokecolo Twin", "Pokemon Go", 
  "Pokemon TCG Pocket", "Princess Connect! Re:Dive", "Professional Baseball Spirits A", 
  "Project SEKAI", "PUBG", "PUBG Mobile", "Puzzle and Dragons", "Raid: Shadow Legends", 
  "Rainbow Six Siege", "Rise of Kingdoms", "Rocket League", "RuneScape 3", "Rust", 
  "SD Gundam G Generation ETERNAL", "Sea of Thieves", "Seven Knights Re:BIRTH", "Shadowverse", 
  "Silver and Blood", "Sky: Children of the Light", "Spotify", "Steal a Brainrot", "Steam", 
  "Stella Sora", "Summoners War", "The Finals", "The Forge", "The Seven Deadly Sins", 
  "Throne and Liberty", "Tower of Fantasy", "Ubisoft Connect", "Uma Musume Pretty Derby", 
  "unVEIL the world", "War Thunder", "Warframe", "Watcher of Realms", "Where Winds Meet", 
  "White Cat Project", "World of Tanks", "World of Warcraft", "World of Warships", 
  "WoW Classic", "WoW Mists of Pandaria", "Wuthering Waves", "Xbox", 
  "Yo-kai Watch: Wibble Wobble", "Yu-Gi-Oh! Master Duel", "Zenless Zone Zero"
];

export const SOFTWARE_PRODUCTS: Product[] = [
  { id: 1, title: 'Canva Educação (1 Ano)', price: 'R$ 25,00', image: '🎨', type: 'Design' },
];

export const ROBLOX_STYLES: string[] = [
  'Godhuman (Deus Humano)', 
  'Sanguine Art', 
  'Dragon Talon', 
  'Electric Claw', 
  'Sharkman Karate', 
  'Death Step', 
  'Superhuman', 
  'Dragon Breath', 
  'Dark Step', 
  'Electro', 
  'Water Kung Fu',
  'Conta Level Max (Genérico)',
  'Conta com Leopard',
  'Conta com Kitsune'
];

export const POOL_PACKS: PoolPack[] = [
  { id: 1, amount: '100 Milhões', price: 25.00 },
  { id: 2, amount: '500 Milhões', price: 50.00 },
  { id: 3, amount: '1 Bilhão', price: 100.00 },
];