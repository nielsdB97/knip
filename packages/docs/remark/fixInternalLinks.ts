import { bold, cyan, dim } from 'kleur/colors';
import { visit, type Visitor } from 'unist-util-visit';
import { base } from '../config.js';
import type { Parent } from 'unist';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

export const fixInternalLinks = () => (tree: Parent) => {
  const visitor: Visitor = node => {
    if ((node.type === 'link' || node.type === 'definition') && node.url.startsWith('.')) {
      const url = node.url;
      node.url = url
        .replace(/^(\.\/|\.\.\/)/, (match: string) => (match === './' ? base + '/' : match))
        .replace(/\.mdx?(#.+)?$/, '$1');
      console.log(`${dim(dateTimeFormat.format(new Date()))} ${bold(cyan('[fix-link]'))} Modify ${url} → ${node.url}`);
    }
  };
  visit(tree, visitor);
};
