import { QuartzComponent } from '@quartz-community/types';
import { S as SortFn } from '../PageList-DncPcZ4-.js';
export { P as PageList, b as byDateAndAlphabetical, a as byDateAndAlphabeticalFolderFirst } from '../PageList-DncPcZ4-.js';

interface TagContentOptions {
    sort?: SortFn;
    numPages: number;
}
declare const _default: (opts?: Partial<TagContentOptions>) => QuartzComponent;

export { SortFn, _default as TagContent };
