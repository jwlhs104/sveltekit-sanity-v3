import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type CodeEditorLineNumbersProps = typeof __propDef.props;
export declare type CodeEditorLineNumbersEvents = typeof __propDef.events;
export declare type CodeEditorLineNumbersSlots = typeof __propDef.slots;
export default class CodeEditorLineNumbers extends SvelteComponentTyped<CodeEditorLineNumbersProps, CodeEditorLineNumbersEvents, CodeEditorLineNumbersSlots> {
}
export {};
