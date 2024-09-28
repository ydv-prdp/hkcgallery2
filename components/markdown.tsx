import markdownit from "markdown-it"
import DOMPurify from 'dompurify' 


interface MarkdownProps{
    text:string;

}
const md = markdownit()
const Markdown = ({text}:MarkdownProps) => {
    const htmlContent = md.render(text)
    const sanitizedHTMLContent =DOMPurify.sanitize(htmlContent)
  return (
    // <div dangerouslySetInnerHTML={{__html:sanitizedHTMLContent}}></div>
    <div dangerouslySetInnerHTML={{__html:htmlContent}}></div>

  )
}

export default Markdown