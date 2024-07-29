import {style} from './style.scss';
import {bgBoxAmt} from './export.module.scss';
import {html} from './index.html';
import {tileFactory} from './modules/tileFactory';
import {logger} from './modules/logger';
import {contentNav} from './modules/contentNav';
import {dataMan} from './modules/dataMan';
import {json} from '../data/content_manifest.json';


const main = () => {
    const boxAmt = parseInt(bgBoxAmt);
    tileFactory.build(boxAmt);
    contentNav.init();
};

main();

export function next(){ contentNav.next();}
export function prev(){ contentNav.prev();}
export function interactive(){ contentNav.interactive();}
export function motion(){ contentNav.motion();}
export function sitemap(){ contentNav.showSitemap();}
export function loadContent(id){ contentNav.loadContent(id);}