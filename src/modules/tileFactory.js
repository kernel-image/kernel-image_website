const tileFactory = ( function () {       
    const component = (index) => {
        const element = document.createElement('div');

        element.className = `item level${index}`;

        return element;
    }
    const build = (amt) => {
        let components = [];
        for (let i = 1; i < amt+1; i++) {
            components.push(component(i));
        }
        const container = document.querySelector('.bodywrapper');
        container.append(...components);
    }

    return {build};
})();


export {tileFactory};