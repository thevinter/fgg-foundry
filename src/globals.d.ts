import { FggConfig, CombatConfig } from './module/config';

declare global {

  interface LenientGlobalVariableTypes {
    game: never; //type is entirely irrelevant, as long as it is configured
  }

  interface CONFIG {
    FGG: FggConfig,
    Combat: CombatConfig
  }
}