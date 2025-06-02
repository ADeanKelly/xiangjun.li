import parse, { domToReact } from "html-react-parser"
import Image from "next/image";

export function parsePostContent(content) {
  const options = {
    replace: ({ name, attribs, children, domNode }) => {
      const isImage = name === "img";

      if (isImage) {
        attribs.className = attribs.class;
				delete attribs.class;
				attribs.srcSet = attribs.srcset;
				delete attribs.srcset;
				return (
					<>
						<Image {...attribs} alt='image' width="0" height="0" sizes="100vw" style={{ width: '100%', height: 'auto' }}></Image>
					</>
				)
      }
    }
  }
  const newContent = parse(content, options);
  return newContent;

}