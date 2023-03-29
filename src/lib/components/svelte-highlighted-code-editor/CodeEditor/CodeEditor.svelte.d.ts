import { SvelteComponentTyped } from "svelte";
import { PrismLanguage } from "./CodeEditor.models";
declare const __propDef: {
    props: {
        value: string;
        language?: PrismLanguage | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type CodeEditorProps = typeof __propDef.props;
export declare type CodeEditorEvents = typeof __propDef.events;
export declare type CodeEditorSlots = typeof __propDef.slots;
export default class CodeEditor extends SvelteComponentTyped<CodeEditorProps, CodeEditorEvents, CodeEditorSlots> {
}
export {};
