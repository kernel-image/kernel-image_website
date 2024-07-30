import { dataMan } from "./dataMan";
import { logger } from "./logger";

const contentNav = (function () {

    let currentIdx = 0;
    let contentRecords = [];
    let interactiveNav = null;
    let motionNav = null;
    let filter = "default";//defualt, interactive, motion


    const init =  () => {
        resetRender(dataMan.getAllContentRecords);
        resetStates();
    };

    const reset = () => {
        resetFilter(dataMan.getAllContentRecords);
        resetStates();
    }
    const resetRender =  async (fetchFunction) => {
        await resetFilter(fetchFunction);
        if (contentRecords.length > 0) {
            updateIFrameGlobal();
        }
        else {
            logger.log("no content found");
        }
    };

    const resetFilter = async (fetchFunction) => {
        currentIdx = 0;
        contentRecords = await fetchFunction() ?? [];
    }

    const resetStates = () => {
        if (interactiveNav){
            interactiveNav.classList.remove("active");}
        if (motionNav){
            motionNav.classList.remove("active");}
        filter = "default";
    };

    const updateIFrameGlobal = () => {
        updateIFrameWithObj(contentRecords[currentIdx]);
    };

    const updateIFrameWithObj = (content) => {
        updateIFrame(content.url, content.title, content.description);
    }

    const updateIFrame = (url, title, description) => {
        const iframe = document.querySelector(".content.image iframe");
        iframe.src = `https://player.vimeo.com/video/${url}?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff`;
        document.querySelector(".content.title").innerHTML = title;
        document.querySelector(".content.description").innerHTML = description;
    }


    const next = () => {
        hideSitemap();
        if (contentRecords.length > 0) {
            if (currentIdx < contentRecords.length - 1 && currentIdx >= 0) {
                currentIdx++;
            }
            else if (currentIdx >= contentRecords.length - 1 || currentIdx < 0) {
                currentIdx = 0;
            }
            updateIFrameGlobal();
        }
    };

    const prev = () => {
        hideSitemap();
        if (contentRecords.length > 0) {
            if (currentIdx <= contentRecords.length - 1 && currentIdx > 0) {
                currentIdx--;
            }
            else if (currentIdx <= 0 || currentIdx > contentRecords.length - 1) {
                currentIdx = contentRecords.length - 1;
            }
            updateIFrameGlobal();
        }
    };

    const interactive = () => {
        if (filter != "interactive"){
            filter = "interactive";
            resetRender(dataMan.getInteractiveConetentRecords);
            if (!interactiveNav) {
                interactiveNav = document.querySelector(".interactive");
            }
            interactiveNav.classList.add("active");
            if (motionNav){
                motionNav.classList.remove("active");}
        }
        else{
            init();
        }
        
        
        hideSitemap();
    }

    const motion = () => {
        if (filter != "motion"){
            filter = "motion";
            resetRender(dataMan.getMotionContentRecords);
            if (!motionNav) {
                motionNav = document.querySelector(".motion");
            }
            motionNav.classList.add("active");
            if (interactiveNav){
                interactiveNav.classList.remove("active");}
        }
        else{
            init();
        }
        

        hideSitemap();
    }

    const initSitemap = async () => {
        const table = await dataMan.getSitemap();
        return table;
    }

    const showSitemap = async () => {
        const sitemapWrapper = document.querySelector(".sitemap");
        if (sitemapWrapper.innerHTML === "")
            sitemapWrapper.innerHTML = await initSitemap();
        sitemapWrapper.style.display = "inline-block";
        const contnetWrapper = document.querySelector(".content.wrapper");
        contnetWrapper.style.visibility = "hidden";
        resetStates();
    }

    const hideSitemap = () => {
        let sitemapWrapper = document.querySelector(".sitemap");
        sitemapWrapper.style.display = "none";
        let contnetWrapper = document.querySelector(".content.wrapper");
        contnetWrapper.style.visibility = "visible";
    }


    const loadContent = (id) => {
        reset();
        currentIdx = getIdxFromId(id);
        updateIFrameGlobal();
        hideSitemap();
    }

    const getIdxFromId = (id) => {
        return contentRecords.findIndex(c => c.id === id);
    }



    return {init, next, prev, interactive, motion, showSitemap, loadContent};
})();


export {contentNav};