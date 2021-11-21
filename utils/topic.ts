import { Technology } from './techs';

export type Topic = {
  // unique id that corresponds to the folder
  id: string;
  // this is how the topic will be displayed in the list
  label: string;
  // used for browser tab title
  description: string;
  categories: string[];
  availableTechs: Technology[];
};
