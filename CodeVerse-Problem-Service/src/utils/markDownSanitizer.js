const marked = require('marked');
const sanitizeHTML= require('sanitize-html');
const TurndownService = require('turndown')

function markdownSanitizer(markdown){
    const html = marked.parse(markdown);
    
    const clennedHTML = sanitizeHTML(html,{
        allowedTags: sanitizeHTML.defaults.allowedTags.concat(['img'])

    });
    
    const turndownService = new TurndownService()
    
    const cleanMarkdown = turndownService.turndown(clennedHTML);
    console.log(cleanMarkdown);
    return cleanMarkdown;
};

module.exports = markdownSanitizer;