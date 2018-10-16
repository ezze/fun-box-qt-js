import path from 'path';
import puppeteer from 'puppeteer';
import rimraf from 'rimraf';
import mkdirp from 'mkdirp';

const travis = !!process.env.TRAVIS;
const headless = travis || !!process.env.HEADLESS;
const port = process.env.PORT || 6006;

const outputDirectoryPath = path.resolve(__dirname, 'output');
const timeout = 30000;
const typeOptions = { delay: 50 };

describe('e2e', () => {
    let browser, page;

    beforeAll(async() => {
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
        return Promise.resolve();
    });

    const makeScreenshot = async name => {
        await delay();
        return page.screenshot({ path: path.resolve(outputDirectoryPath, `${name}.png`) });
    };

    const addPoint = name => {
        return page.type('.route-form-input', `${name}${String.fromCharCode(13)}`, typeOptions);
    };

    const dragMap = async(startX, startY, endX, endY) => {
        const { mapWidth, mapHeight, mapLeft, mapTop } = await page.$eval('.map', map => {
            const rect = map.getBoundingClientRect();
            return {
                mapWidth: rect.width,
                mapHeight: rect.height,
                mapLeft: rect.left,
                mapTop: rect.top
            };
        });
        await page.mouse.move(Math.round(mapLeft + mapWidth * startX), Math.round(mapTop + mapHeight * startY));
        await page.mouse.down();
        await page.mouse.move(Math.round(mapLeft + mapWidth * endX), Math.round(mapTop + mapHeight * endY));
        await page.mouse.up();
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

    it('e2e', async() => {
        await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle2' });
        await makeScreenshot('startup');

        await addPoint('Point 1');
        await validateListItemsCount(1);
        await validateListItemName(0, 'Point 1');
        await makeScreenshot('add-point1');

        await dragMap(0.25, 0.25, 0.4, 0.4);
        await addPoint('Point 2');
        await validateListItemsCount(2);
        await validateListItemName(1, 'Point 2');
        await makeScreenshot('add-point2');

        await dragMap(0.7, 0.6, 0.4, 0.5);
        await addPoint('Point 3');
        await validateListItemsCount(3);
        await validateListItemName(2, 'Point 3');
        await makeScreenshot('add-point3');

        return Promise.resolve();
    }, timeout);
});

function delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
