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
export declare type CodeEditorTextAreaProps = typeof __propDef.props;
export declare type CodeEditorTextAreaEvents = typeof __propDef.events;
export declare type CodeEditorTextAreaSlots = typeof __propDef.slots;
export default class CodeEditorTextArea extends SvelteComponentTyped<CodeEditorTextAreaProps, CodeEditorTextAreaEvents, CodeEditorTextAreaSlots> {
}
export {};
