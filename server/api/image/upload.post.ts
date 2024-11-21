export default defineEventHandler(async(event) => {
    const files = await readMultipartFormData(event);

    // todo エラーハンドリング
    if(files === undefined || files.length === 0) {
        return {
            statusCode:400,
            statusMessage:'No file uploaded'
        };
    }

    return {
        statusCode:200,
        statusMessage:'success',
    }
});
