const fs = require('fs');

describe('File Upload Test', () => {

    it('should upload a file', async () => {
        // Set capabilities
        const capabilities = {
            'bstack:options': {
                "osVersion": "10.0",
                "deviceName": "Samsung Galaxy S20",
                "realMobile": "true",
                "projectName": "Upload Files",
                "buildName": "Upload_file",
                "userName" : "BrowserStack-Usename",
                "accessKey" : "BrowserStack-AccessKey",
            },
            "browserName": "chrome",
        };

        // Open the URL
        await browser.url('https://the-internet.herokuapp.com/upload');

        // Read local file and convert to base64
        const localFilePath = '/Users/muskanbahrani/Desktop/TestImage.png'; // replace with your actual file path
        const data = fs.readFileSync(localFilePath);
        const convertedData = Buffer.from(data).toString('base64');

        // Push the file to the device (if required for mobile testing)
        await browser.pushFile('/data/local/tmp/TestImage.png',convertedData); // replace with the actual file name

        // Interact with the file input element to upload the file
        const uploadFileInput = await $('#file-upload');
        await uploadFileInput.setValue('/data/local/tmp/TestImage.png'); // Use the correct file path for your environment

        // Click on the upload button
        const submitButton = await $('#file-submit');
        await submitButton.click();

        // You can add an assertion here to check if the file was uploaded successfully
        //await expect(browser).toHaveUrlContaining('upload');

        // End session
        await browser.deleteSession();
    });
});
