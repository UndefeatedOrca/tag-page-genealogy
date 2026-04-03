export { _ as TagContent } from '../TagContent-BLPikvbg.js';
import { QuartzComponent, SortFn } from '@quartz-community/types';
export { SortFn } from '@quartz-community/types';

declare function byDateAndAlphabetical(cfg: unknown): SortFn;
declare function byDateAndAlphabeticalFolderFirst(cfg: unknown): SortFn;
declare const PageList: QuartzComponent;

export { PageList, byDateAndAlphabetical, byDateAndAlphabeticalFolderFirst };
