import path from 'path';
import http from 'http';
import puppeteer from 'puppeteer';
import rimraf from 'rimraf';
import mkdirp from 'mkdirp';

import app from '../server';

const travis = !!process.env.TRAVIS;
const headless = travis || !!process.env.HEADLESS;
const port = process.env.PORT || 6006;

const outputDirectoryPath = path.resolve(__dirname, 'output');
const timeout = 30000;
const typeOptions = { delay: 50 };

describe('e2e', () => {
    let server, browser, page;

    beforeAll(async() => {
        server = http.createServer(app.callback()).listen(port);
        const options = { headless };
        if (travis) {
            options.args = ['--no-sandbox'];
        }
        browser = await puppeteer.launch(options);
        rimraf.sync(outputDirectoryPath);
        mkdirp.sync(outputDirectoryPath);
        return Promise.resolve();
    });

    beforeEach(async() => {
        page = await browser.newPage();
        await page.setViewport({
            width: 1920,
            height: 1080
        });
        return Promise.resolve();
    });

    afterEach(async() => {
        await page.close();
        return Promise.resolve();
    });

    afterAll(async() => {
        await browser.close();
        await closeServer(server);
        return Promise.resolve();
    });

    function closeServer(server) {
        return new Promise(resolve => server.close(resolve));
    }

    const makeScreenshot = async name => {
        await delay();
        return page.screenshot({ path: path.resolve(outputDirectoryPath, `${name}.png`) });
    };

    const addPoint = name => {
        return page.type('.route-form-input', `${name}${String.fromCharCode(13)}`, typeOptions);
    };

    const removePoint = async index => {
        const routeListItems = await page.$$('.route-list-item');
        (await routeListItems[index].$('.route-list-item-remove')).click();
        return Promise.resolve();
    };

    const dragMap = async(startX, startY, endX, endY) => {
        const map = await page.$('.map');
        const mapBox = await map.boundingBox();
        await page.mouse.move(
            Math.round(mapBox.x + mapBox.width * startX),
            Math.round(mapBox.y + mapBox.height * startY)
        );
        await page.mouse.down();
        await page.mouse.move(
            Math.round(mapBox.x + mapBox.width * endX),
            Math.round(mapBox.y + mapBox.height * endY));
        await page.mouse.up();
        return Promise.resolve();
    };

    const dragListItem = async(startIndex, endIndex) => {
        const routeListItems = await page.$$('.route-list-item');
        const startListItem = routeListItems[startIndex];
        const endListItem = routeListItems[endIndex];
        const startBox = await startListItem.boundingBox();
        const endBox = await endListItem.boundingBox();
        await page.mouse.move(
            Math.round(startBox.x + startBox.width * 0.5),
            Math.round(startBox.y + startBox.height * 0.5)
        );
        await page.mouse.down();
        await page.mouse.move(
            Math.round(endBox.x + endBox.width * 0.5),
            Math.round(endBox.y + endBox.height * 0.5),
            { steps: 5 }
        );
        await page.mouse.up();
        await delay();
        return Promise.resolve();
    };

    const validateListItemsCount = async expectedCount => {
        const routeListItems = await page.$$('.route-list-item');
        expect(routeListItems).toHaveLength(expectedCount);
        return Promise.resolve();
    };

    const validateListItemName = async(index, expectedName) => {
        const routeListItems = await page.$$('.route-list-item');
        expect(await routeListItems[index].$eval('.route-list-item-name', el => el.innerHTML)).toEqual(expectedName);
        return Promise.resolve();
    };

    it('main', async() => {
        await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle2' });
        await makeScreenshot('startup');

        await addPoint('Point 1');
        await makeScreenshot('add-point-1');
        await validateListItemsCount(1);
        await validateListItemName(0, 'Point 1');

        await dragMap(0.25, 0.25, 0.4, 0.4);
        await addPoint('Point 2');
        await makeScreenshot('add-point-2');
        await validateListItemsCount(2);
        await validateListItemName(1, 'Point 2');

        await dragMap(0.7, 0.6, 0.4, 0.5);
        await addPoint('Point 3');
        await makeScreenshot('add-point-3');
        await validateListItemsCount(3);
        await validateListItemName(2, 'Point 3');

        await dragListItem(2, 0);
        await makeScreenshot('drag-list-item');
        await validateListItemName(0, 'Point 3');
        await validateListItemName(1, 'Point 1');
        await validateListItemName(2, 'Point 2');

        await removePoint(1);
        await makeScreenshot('remove-point');
        await validateListItemsCount(2);
        await validateListItemName(0, 'Point 3');
        await validateListItemName(1, 'Point 2');

        return Promise.resolve();
    }, timeout);
});

function delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
