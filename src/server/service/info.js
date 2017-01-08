/**
 * Created by feng on 2017/1/8.
 */
import * as infoStore from '../store/info';
import * as keywordStore from '../store/keyword';

export async function getInfo() {
    const rows = await infoStore.getWebInfo();
    if (rows && rows.length > 0) {
        return rows[0];
    } else {
        return {};
    }
}

export async function getKeywords() {
    const keywords = await keywordStore.getKeyword();
    let keywordStr = '';

    keywords.forEach((keyword, index) =>
        keywordStr += `${keyword.keyword}${index + 1 == keywords.length ? '' : ','}`);

    return keywordStr;
}