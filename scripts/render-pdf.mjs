import fs from 'node:fs';
import {createCanvas} from '../.tools/node_modules/@napi-rs/canvas/index.js';
import {getDocument} from '../.tools/node_modules/pdfjs-dist/legacy/build/pdf.mjs';
const pdf=await getDocument({data:new Uint8Array(fs.readFileSync('C:/Users/caioh/OneDrive/Desktop/Catalogo_Apex_Safety_2026_v2.pdf'))}).promise;
fs.mkdirSync('.tools/pages',{recursive:true});
const contact=createCanvas(4*310,8*439);const ctx=contact.getContext('2d');
for(let n=1;n<=pdf.numPages;n++){const p=await pdf.getPage(n);const c=createCanvas(1240,1754);await p.render({canvasContext:c.getContext('2d'),viewport:p.getViewport({scale:1240/p.view[2]})}).promise;fs.writeFileSync(`.tools/pages/${n}.png`,c.toBuffer('image/png'));ctx.drawImage(c,((n-1)%4)*310,Math.floor((n-1)/4)*439,310,439);ctx.fillStyle='red';ctx.font='bold 22px sans-serif';ctx.fillText(String(n),((n-1)%4)*310+10,Math.floor((n-1)/4)*439+24);}
fs.writeFileSync('.tools/contact.png',contact.toBuffer('image/png'));
