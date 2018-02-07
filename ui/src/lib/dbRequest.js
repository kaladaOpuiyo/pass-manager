import config from './config';

const dbUrl =
`https://${config.apiGateway.API_GATEWAY_KEY}.` +
`execute-api.${config.apiGateway.AZ}.` +
`amazonaws.com/${config.apiGateway.STAGE}/${config.apiGateway.END_POINT}`;

class dbRequest_ {

  static dbReq(data, userToken, method) {

    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': userToken});
    const url = (method === 'GET' ? [`${dbUrl}?username=${data}`] : [`${dbUrl}`]);
    const body = (method === 'GET' ? null : JSON.stringify(data));
    const header = {method, headers, body};

    return new Promise((resolve, reject) => {
      fetch(url, header)
        .then((json) => resolve(json.json()))
        .catch((xhr, status, err) => reject(status + err.message));
    });
  }
}
export default dbRequest_;
