if(!self.define){let e,i={};const d=(d,s)=>(d=new URL(d+".js",s).href,i[d]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=d,e.onload=i,document.head.appendChild(e)}else e=d,importScripts(d),i()})).then((()=>{let e=i[d];if(!e)throw new Error(`Module ${d} didn’t register its module`);return e})));self.define=(s,t)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let r={};const a=e=>d(e,n),o={module:{uri:n},exports:r,require:a};i[n]=Promise.all(s.map((e=>o[e]||a(e)))).then((e=>(t(...e),r)))}}define(["./workbox-873c5e43"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"../dist/fonts/fuzzy-bubbles/index.d.ts",revision:"111dc675c9cfd95d06b2f3b15d730aa1"},{url:"../dist/gestures/swipe.d.ts",revision:"7e13f423fdbb789ccc1dfcc2d8dfcc2f"},{url:"../dist/hooks/history-state.d.ts",revision:"f05d96b32684edf86809c071984a0829"},{url:"../dist/hooks/language.d.ts",revision:"5412cf7f0c342d384309cc1bce477052"},{url:"../dist/index.d.ts",revision:"0e1955786cf6972132bc1dd24fed7a93"},{url:"../dist/input-digit/digicode/digicode-view.d.ts",revision:"dffb426946f8ee4efc353b0bfe2983ea"},{url:"../dist/input-digit/digicode/index.d.ts",revision:"ae310795880a7d4171e9f4a33bf4a413"},{url:"../dist/input-digit/index.d.ts",revision:"0e6be6153539987acf52b5ca101bdb56"},{url:"../dist/input-digit/input-digit.d.ts",revision:"be05f3c2ac5c209edafb6337e92d4954"},{url:"../dist/loader.d.ts",revision:"12584956276e10a0b024b99c9e91b85d"},{url:"../dist/setupTests.d.ts",revision:"42473e28bfa4029faa379f80cad12501"},{url:"../dist/state/index.d.ts",revision:"8e5f7a09d653b316627cc035593b2846"},{url:"../dist/state/state.d.ts",revision:"8b80697f12a80c5079b46097984bc79d"},{url:"../dist/translate/index.d.ts",revision:"f44b3a43102e4f2bd0aae29d7c4a95a6"},{url:"../dist/translate/translate-base.d.ts",revision:"57449a4a60f0c5514468d56866c2364a"},{url:"../dist/translate/translate.d.ts",revision:"d265155edeb4084de5f9302f66b544c2"},{url:"../dist/translate/translations/lang-en.d.ts",revision:"6d0f311f13b1934b317343274149c157"},{url:"../dist/translate/translations/lang-fr.d.ts",revision:"9da1dbaeaad4c2e9f160a14d97888150"},{url:"../dist/translate/translations/lang-it.d.ts",revision:"5a3a9baa4f8386895d02944833fc8a65"},{url:"../dist/types.d.ts",revision:"7871eaee33f93e19f221f5efde449cc1"},{url:"../dist/view/app/app-view.d.ts",revision:"2fe0f1481dea445559c3d15a010174fe"},{url:"../dist/view/app/index.d.ts",revision:"ebef0887a77759ae1279dc413b1313b0"},{url:"../dist/view/app/instructions/index.d.ts",revision:"0add69997d03c78b838dcb9313b03c97"},{url:"../dist/view/app/instructions/instructions-view.d.ts",revision:"d2dea429f3204abbcce73e7dd6db11bb"},{url:"../dist/view/app/rules.d.ts",revision:"d5f3ac04e0fd1b466dc65ac4e0f024ed"},{url:"../dist/view/convent-3d/convent-3d-hooks.d.ts",revision:"9be2da6a062f0a523f1e7bbfffeabb63"},{url:"../dist/view/convent-3d/convent-3d-view.d.ts",revision:"644c2950c376dc5ffa008af6d659bccd"},{url:"../dist/view/convent-3d/index.d.ts",revision:"5980b123f1ee006c9766871819358405"},{url:"../dist/view/convent-3d/rotation-manager.d.ts",revision:"2b8b9e6b31186a855b74ce45e7e38ae3"},{url:"../dist/view/convent-floor/convent-floor-view.d.ts",revision:"aebcce6a827c67f931be329ca30e23bd"},{url:"../dist/view/convent-floor/index.d.ts",revision:"897bcafee9ceecbd13642a9f1d3d516f"},{url:"../dist/view/convent-floor/room/index.d.ts",revision:"55a08c2ed0762e608f4bdc3700dd00f3"},{url:"../dist/view/convent-floor/room/room-view.d.ts",revision:"b7bf4e2e157ad5aec4cb3d7b3584c65e"},{url:"../dist/view/language-button/index.d.ts",revision:"52525495dfb1b2dff70ecb95268a4405"},{url:"../dist/view/language-button/language-button-view.d.ts",revision:"09e4100c71e1e3b0a6e0a6851cd78d97"},{url:"asset/text/fr/mono-alphabet-code.txt",revision:"5716c7b111506db761b88d26d67875f5"},{url:"favicon.ico",revision:"7a92d6a67d81716d2343b349053617f4"},{url:"fnt/fuzzy-bubbles-0.woff2",revision:"bab16dabb711a6a58240c51b6a756933"},{url:"fnt/fuzzy-bubbles-1.woff2",revision:"a94ebedc0d8191ddcbb71c152a6d5c89"},{url:"fnt/fuzzy-bubbles-2.woff2",revision:"1a90b7b74f38b35ec2c56931922e3435"},{url:"fnt/fuzzy-bubbles-3.woff2",revision:"8b01cd7b08364c4debd10fdfefb5031a"},{url:"fnt/fuzzy-bubbles-4.woff2",revision:"66db9090f52a7ab2860e492ccfef1fe9"},{url:"fnt/fuzzy-bubbles-5.woff2",revision:"2fc04fcd094c7ff7b9d90d3c0c3d11da"},{url:"img/compass.b8b993f8a20a5319a835.png",revision:null},{url:"img/floor.14447419a22a2562785c.png",revision:null},{url:"img/floor.7337eaa7fe38ab3b2726.webp",revision:null},{url:"index.html",revision:"c38d0f12b49d042ac5e6ef5e98e8f6c8"},{url:"logo192.png",revision:"d04c63e88c039a5c67b4bf0525c91925"},{url:"logo512.png",revision:"12754e3f34d28bd8d5f65c75f25773bd"},{url:"manifest.json",revision:"1f21afa714380aaa235062ee743489f2"},{url:"msh/convent.57479d48035a9bfad3ec2ec11b8d71d9.glb",revision:null},{url:"robots.txt",revision:"fa1ded1ed7c11438a9b0385b1e112850"},{url:"scr/app.9304ac2e5c961c4a6abe.js",revision:null},{url:"scr/libs.1b8ae651333829a1c28a.js.LICENSE.txt",revision:"28918e9b1a6166848b83a0cf1b5f3ea1"},{url:"scr/runtime.5a326ed0d0d153feb94e.js",revision:null}],{})}));
//# sourceMappingURL=service-worker.js.map
