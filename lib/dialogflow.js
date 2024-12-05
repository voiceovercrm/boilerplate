// lib/dialogflow.js
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: process.env.DIALOGFLOW_KEY_FILE,
});

async function sendMessageToDialogflow(message) {
  const sessionId = uuid.v4();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    return result.fulfillmentText;
  } catch (error) {
    console.error('Error communicating with Dialogflow:', error);
    return 'An error occurred while processing your request.';
  }
}

module.exports = { sendMessageToDialogflow };