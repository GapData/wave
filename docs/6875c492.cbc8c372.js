(window.webpackJsonp=window.webpackJsonp||[]).push([[107,28],{162:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),l=t(311),m=t(317),c=t(309);a.default=function(e){var a=e.metadata,t=e.items,r=a.allTagsPath,o=a.name,i=a.count;return n.a.createElement(l.a,{title:'Posts tagged "'+o+'"',description:'Blog | Tagged "'+o+'"'},n.a.createElement("div",{className:"container margin-vert--lg"},n.a.createElement("div",{className:"row"},n.a.createElement("main",{className:"col col--8 col--offset-2"},n.a.createElement("h1",null,i," ",function(e,a){return e>1?a+"s":a}(i,"post"),' tagged with "',o,'"'),n.a.createElement(c.a,{href:r},"View All Tags"),n.a.createElement("div",{className:"margin-vert--xl"},t.map((function(e){var a=e.content;return n.a.createElement(m.a,{key:a.metadata.permalink,frontMatter:a.frontMatter,metadata:a.metadata,truncated:!0},n.a.createElement(a,null))})))))))}},313:function(e,a,t){"use strict";t.d(a,"a",(function(){return o}));var r=t(0),n=t.n(r),l=t(314),m=t(315),c=function(){var e=n.a.useState(!!window.localStorage.getItem("noticeRead")),a=e[0],t=e[1];return n.a.createElement("section",{className:"notice",style:{opacity:a?0:1}},n.a.createElement("div",null,n.a.createElement("p",null,"By using this website you agree to our use of cookies. "),n.a.createElement("a",{href:"https://www.h2o.ai/privacy/",target:"_blank"},"Read H2O.ai\u2019s privacy policy.")),n.a.createElement("span",{className:"notice__close",onClick:function(){window.localStorage.setItem("noticeRead",!0),t(!0)}},"X"))};function o(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement(m.a,null,c),n.a.createElement(l.a,e))}},317:function(e,a,t){"use strict";var r=t(0),n=t.n(r),l=t(310),m=t(305),c=t(312),o=t(309),i=t(320),s=t(307),u=t(46),g=t.n(u),E=["January","February","March","April","May","June","July","August","September","October","November","December"];a.a=function(e){var a,t,r,u,d,p=e.children,v=e.frontMatter,h=e.metadata,f=e.truncated,b=e.isBlogPostPage,w=void 0!==b&&b,N=h.date,_=h.permalink,k=h.tags,y=h.readingTime,T=v.author,M=v.title,R=v.image,I=v.keywords,P=v.author_url||v.authorURL,F=v.author_title||v.authorTitle,J=v.author_image_url||v.authorImageURL,O=Object(s.a)(R,{absolute:!0});return n.a.createElement(n.a.Fragment,null,n.a.createElement(c.a,null,I&&I.length&&n.a.createElement("meta",{name:"keywords",content:I.join(",")}),R&&n.a.createElement("meta",{property:"og:image",content:O}),R&&n.a.createElement("meta",{property:"twitter:image",content:O}),R&&n.a.createElement("meta",{name:"twitter:image:alt",content:"Image for "+M})),n.a.createElement("article",{className:w?void 0:"margin-bottom--xl"},(a=w?"h1":"h2",t=N.substring(0,10).split("-"),r=t[0],u=E[parseInt(t[1],10)-1],d=parseInt(t[2],10),n.a.createElement("header",null,n.a.createElement(a,{className:Object(l.a)("margin-bottom--sm",g.a.blogPostTitle)},w?M:n.a.createElement(o.a,{to:_},M)),n.a.createElement("div",{className:"margin-vert--md"},n.a.createElement("time",{dateTime:N,className:g.a.blogPostDate},u," ",d,", ",r," ",y&&n.a.createElement(n.a.Fragment,null," \xb7 ",Math.ceil(y)," min read"))),n.a.createElement("div",{className:"avatar margin-vert--md"},J&&n.a.createElement("a",{className:"avatar__photo-link avatar__photo",href:P,target:"_blank",rel:"noreferrer noopener"},n.a.createElement("img",{src:J,alt:T})),n.a.createElement("div",{className:"avatar__intro"},T&&n.a.createElement(n.a.Fragment,null,n.a.createElement("h4",{className:"avatar__name"},n.a.createElement("a",{href:P,target:"_blank",rel:"noreferrer noopener"},T)),n.a.createElement("small",{className:"avatar__subtitle"},F)))))),n.a.createElement("section",{className:"markdown"},n.a.createElement(m.a,{components:i.a},p)),(k.length>0||f)&&n.a.createElement("footer",{className:"row margin-vert--lg"},k.length>0&&n.a.createElement("div",{className:"col"},n.a.createElement("strong",null,"Tags:"),k.map((function(e){var a=e.label,t=e.permalink;return n.a.createElement(o.a,{key:t,className:"margin-horiz--sm",to:t},a)}))),f&&n.a.createElement("div",{className:"col text--right"},n.a.createElement(o.a,{to:h.permalink,"aria-label":"Read more about "+M},n.a.createElement("strong",null,"Read More"))))))}}}]);