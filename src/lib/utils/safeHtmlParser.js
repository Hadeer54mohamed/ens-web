import parse, { domToReact } from 'html-react-parser';
import { Fragment, createElement } from 'react';

const ALLOWED_TAGS = new Set([
  'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'span', 'div',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
  'blockquote', 'code', 'pre', 'mark', 'small', 'sub', 'sup',
]);

const ALLOWED_ATTRS = new Set(['href', 'title', 'class', 'id', 'style']);

const SAFE_URL = /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i;

function replaceNode(domNode) {
  if (domNode.type === 'tag') {
    if (!ALLOWED_TAGS.has(domNode.name)) {
      if (domNode.children && domNode.children.length > 0) {
        return createElement(Fragment, null, domToReact(domNode.children, { replace: replaceNode }));
      }
      return null;
    }
    if (domNode.attribs) {
      Object.keys(domNode.attribs).forEach((attr) => {
        if (!ALLOWED_ATTRS.has(attr)) {
          delete domNode.attribs[attr];
        } else if (attr === 'href' && !SAFE_URL.test(domNode.attribs[attr])) {
          delete domNode.attribs[attr];
        }
      });
    }
  }
}

/**
 * Sanitize and parse HTML using an allowlist approach (no jsdom needed).
 */
export function safeParse(html) {
  if (!html || typeof html !== 'string') return html || '';
  return parse(html, { replace: replaceNode });
}

export function sanitizeHtml(html) {
  if (!html || typeof html !== 'string') return html || '';
  return parse(html, { replace: replaceNode });
}

export default safeParse;
