import parse, { domToReact } from "html-react-parser"

export function parsePostContent(content) {
  const options = {
    replace: ({ name, attribs, children, domNode }) => {
    }
  }
  const newContent = parse(content, options);
  return newContent;

}