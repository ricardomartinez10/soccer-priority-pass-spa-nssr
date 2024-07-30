import { Player } from "./player.interface";

export interface PlayerRequestResponse {
    priorityPlayers: Array<Player>;
    priorityKeepers: Array<Player>;
  }
  