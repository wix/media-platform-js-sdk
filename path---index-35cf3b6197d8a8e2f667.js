webpackJsonp([0x81b8806e4260],{367:function(a,n){a.exports={data:{site:{siteMetadata:{navigation:[{path:"/",title:"Media Platform JS SDK"},{path:"/api-reference",title:"API reference"},{path:"/callback-functions",title:"Callback functions"},{path:"/file-management",title:"File Management"},{path:"/archive-files",title:"Create and Extract archive files"},{path:"/images",title:"Images"},{path:"/transcode-video",title:"Transcode video"},{path:"/jobs",title:"Jobs"},{path:"/metadata",title:"Metadata"}]}},page:{frontmatter:{layout:"simple",title:"Media Platform JS SDK",include:null},headings:[{depth:1,value:"Media Platform JS SDK"},{depth:2,value:"Installation"},{depth:2,value:"Instantiating the Media Platform in the Server"},{depth:2,value:"Instantiating the Media Platform in the Browser"},{depth:3,value:"From CDN:"}],html:'<h1 id="media-platform-js-sdk"><a href="#media-platform-js-sdk" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Media Platform JS SDK</h1>\n<p>Welcome to the Wix Media Platform - JavaScript SDK wiki!\nHere you can find the full documentation of the SDK\'s public methods.</p>\n<p>First, if you haven\'t done so yet, register at <a href="https://console.wixmp.com/" target="_blank" rel="nofollow noopener noreferrer">Wix Media Platform</a>, and create your <a href="https://support.wixmp.com/en/article/creating-your-organization-and-project" target="_blank" rel="nofollow noopener noreferrer">organization, project</a> and <a href="https://support.wixmp.com/en/article/creating-your-first-application" target="_blank" rel="nofollow noopener noreferrer">application</a>.</p>\n<h2 id="installation"><a href="#installation" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Installation</h2>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">npm i --save media-platform-js-sdk</code></pre>\n      </div>\n<p>Now you can instantiate the Media Platform in your project:</p>\n<h2 id="instantiating-the-media-platform-in-the-server"><a href="#instantiating-the-media-platform-in-the-server" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Instantiating the Media Platform in the Server</h2>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token punctuation">{</span>MediaPlatform<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'media-platform-js-sdk\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> mediaPlatform <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MediaPlatform</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    domain<span class="token punctuation">:</span> <span class="token string">\'&lt;As appears in the application page>\'</span><span class="token punctuation">,</span>\n    appId<span class="token punctuation">:</span> <span class="token string">\'&lt;As appears in the application page>\'</span><span class="token punctuation">,</span>\n    sharedSecret<span class="token punctuation">:</span> <span class="token string">\'&lt;As appears in the application page>\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<h2 id="instantiating-the-media-platform-in-the-browser"><a href="#instantiating-the-media-platform-in-the-browser" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Instantiating the Media Platform in the Browser</h2>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token punctuation">{</span>MediaPlatform<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'media-platform-js-sdk/browser\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> mediaPlatform <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MediaPlatform</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    domain<span class="token punctuation">:</span> <span class="token string">\'&lt;As appears in the application page>\'</span><span class="token punctuation">,</span>\n    authenticationUrl<span class="token punctuation">:</span> <span class="token string">\'&lt;your authentication url - see example below>\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<h3 id="from-cdn"><a href="#from-cdn" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>From CDN:</h3>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>https://static.parastorage.com/unpkg/media-platform-js-sdk@6.0.0-alpha.22/dist/statics/media-platform.bundle.min.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script language-javascript"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> mediaPlatform <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MP<span class="token punctuation">.</span>MediaPlatform</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    domain<span class="token punctuation">:</span> <span class="token string">\'&lt;As appears in the application page>\'</span><span class="token punctuation">,</span>\n    authenticationUrl<span class="token punctuation">:</span> <span class="token string">\'&lt;your authentication url - see example below>\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Authentication URL Node.js (with express) example:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">/**\n * Your own authentication mechanism comes here\n */</span>\napp<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">\'/media-platform/auth-header\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">/**\n     * @description by default, the header authenticates the application\n     * @type {{Authorization}}\n     */</span>\n    <span class="token keyword">const</span> header <span class="token operator">=</span> mediaPlatform<span class="token punctuation">.</span><span class="token function">getAuthorizationHeader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>header<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>'}},pathContext:{}}}});
//# sourceMappingURL=path---index-35cf3b6197d8a8e2f667.js.map