import * as remark from 'remark'
import html from 'remark-html'
import highlight from 'remark-highlight.js';
import {visit} from 'unist-util-visit';

export default async function markdownToHtml(markdown: string) {
  const youtubeLinkParser = () => (tree: any) => {
    visit(tree, 'link', (node: any) => {
      const url = node.url;
      const youtubeMatch = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
      );
      if (youtubeMatch) {
        const videoId = youtubeMatch[1];
        node.type = 'html';
        node.value = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        node.children = [];
      }
    });
  };

  const result = await remark.remark()
                        .use(html, { sanitize: false }) // Allow raw HTML like iframes
                        // .use(youtubeLinkParser)
                        .use(highlight)
                        .process(markdown)
  return result.toString()
}
