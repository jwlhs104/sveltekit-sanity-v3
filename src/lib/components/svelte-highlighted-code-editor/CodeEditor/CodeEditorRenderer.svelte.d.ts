import { SvelteComponentTyped } from "svelte";
import type { PrismLanguage } from "./CodeEditor.models";
declare const __propDef: {
    props: {
        value: string;
        language: PrismLanguage;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type CodeEditorRendererProps = typeof __propDef.props;
export declare type CodeEditorRendererEvents = typeof __propDef.events;
export declare type CodeEditorRendererSlots = typeof __propDef.slots;
export default class CodeEditorRenderer extends SvelteComponentTyped<CodeEditorRendererProps, CodeEditorRendererEvents, CodeEditorRendererSlots> {
}
export {};
