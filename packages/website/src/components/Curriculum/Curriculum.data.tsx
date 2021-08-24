import type { ReactElement } from 'react';

import {
  BabelIcon,
  BootstrapIcon,
  Css3Icon,
  EslintIcon,
  ExpressIcon,
  GithubIcon,
  GitIcon,
  HerokuIcon,
  Html5Icon,
  JavascriptIcon,
  JestIcon,
  MongodbIcon,
  NestjsIcon,
  NetlifyIcon,
  NodejsIcon,
  NpmIcon,
  PassportIcon,
  PostgresqlIcon,
  PrettierIcon,
  ReactIcon,
  ReactRouterIcon,
  ReduxIcon,
  TypescriptIcon,
  VscodeIcon,
  WebpackIcon,
  YarnIcon,
} from '@coderscamp/ui/icons/technologies';

export interface TechIcon {
  name: string;
  value: ReactElement;
}

export const techNamesTop = [
  { name: 'BabelIcon', value: <BabelIcon /> },
  { name: 'BootstrapIcon', value: <BootstrapIcon /> },
  { name: 'Css3Icon', value: <Css3Icon /> },
  { name: 'EslintIcon', value: <EslintIcon /> },
  { name: 'ExpressIcon', value: <ExpressIcon /> },
  { name: 'GithubIcon', value: <GithubIcon /> },
  { name: 'GitIcon', value: <GitIcon /> },
  { name: 'HerokuIcon', value: <HerokuIcon /> },
  { name: 'Html5Icon', value: <Html5Icon /> },
  { name: 'JavascriptIcon', value: <JavascriptIcon /> },
  { name: 'JestIcon', value: <JestIcon /> },
  { name: 'MongodbIcon', value: <MongodbIcon /> },
  { name: 'NestjsIcon', value: <NestjsIcon /> },
];

export const techNamesBottom = [
  { name: 'NetlifyIcon', value: <NetlifyIcon /> },
  { name: 'NodejsIcon', value: <NodejsIcon /> },
  { name: 'NpmIcon', value: <NpmIcon /> },
  { name: 'PassportIcon', value: <PassportIcon /> },
  { name: 'PostgresqlIcon', value: <PostgresqlIcon /> },
  { name: 'PrettierIcon', value: <PrettierIcon /> },
  { name: 'ReactIcon', value: <ReactIcon /> },
  { name: 'ReactRouterIcon', value: <ReactRouterIcon /> },
  { name: 'ReduxIcon', value: <ReduxIcon /> },
  { name: 'TypescriptIcon', value: <TypescriptIcon /> },
  { name: 'VscodeIcon', value: <VscodeIcon /> },
  { name: 'WebpackIcon', value: <WebpackIcon /> },
  { name: 'YarnIcon', value: <YarnIcon /> },
];
