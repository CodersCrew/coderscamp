import type { NodePlopAPI } from 'plop';

export type Answer = any;

export type Answers = Record<string, Answer>;

export type Prompt = Parameters<NodePlopAPI['setPrompt']>[1];
