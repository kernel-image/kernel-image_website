
const dataMan = (function () {

    const dataPath = "./assets/data/content_manifest.json";

    const getData = (url) => {
        return fetch(url)
            .then(response => response.json())
            .then(data => data["content"]);
    };

    const filterData = (data, kword) => {
        return data.filter(d => d.keywords.includes(kword));
    };

    const interactiveFilter = (data) => {
        return filterData(data, "interactive");
    };

    const motionFilter = (data) => {
        return filterData(data, "motion"); 
    };

    const getAllContentRecords = () => {
        return getData(dataPath);
    };

    const getInteractiveConetentRecords = () => {
        return getAllContentRecords()
            .then(data => interactiveFilter(data));
    };

    const getMotionContentRecords = () => {
        return getAllContentRecords()
            .then(data => motionFilter(data));
    };

    const getContentRecordsById = (id) => {
        return getAllContentRecords()
            .then(data => data.find(d => d.id === id));
    };

    const getSitemap = async () => {
        const allRecords = await getAllContentRecords();
        const keywords = [...new Set(allRecords.map(d => d.keywords).flatMap(d => d).sort())];
        let table = '<table><thead><tr><th>Name</th>' + keywords.map(k => `<th>${k}</th>`).join('') + '</tr></thead><tbody>';
        allRecords.forEach( r => {
            let row = `<tr><td><a onclick="lib.loadContent('${r.id}')">${r.title}</a></td>`;
            keywords.forEach(k => {
                row += `<td>${r.keywords.includes(k) ? 'x' : ''}</td>`;
            });
            row += '</tr>';
            table += row;
        });
        table += '</tbody></table>';

        return table;
    }

    return {getAllContentRecords, getInteractiveConetentRecords, getMotionContentRecords, getSitemap};
})();

export {dataMan};