exports.handler = async (event) => {
  const response = {
      statusCode: 200,
      body: JSON.stringify(`Received parameter: ${event.body}`),
  };
  return response;
};