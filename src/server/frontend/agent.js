import https from 'https';

const apiKey = 'apiKey=i4YcHo-NCAiwpVEdLLVkPzNZdo-bzsJD'

export default (req, res) => {

 let dt = Object.keys(req.query).length ? '&' : '?'
 let url = '/api/1/databases/shop/collections' + req.originalUrl.slice(4) + dt + apiKey;

 let body = '';
 req.setEncoding('utf8');
 req.on('data', chunk => body += chunk);
 req.on('end', () => {

   let opts = {
     // protocol: 'https:', port: 443,
     hostname: 'api.mlab.com',
     path: url,
     method: req.method,
     headers: {
       'Content-Type': 'application/json;charset=UTF-8'
     },
   };

   let ext_req = https.request(opts, (ext_res) => {
     ext_res.setEncoding('utf8');
     let data = '';
     ext_res.on('data', chunk => data += chunk);
     ext_res.on('end', () => res.end(data));
   });

   ext_req.on('error', function(e) {
     console.error(`problem with request: ${e.message}`);
   });
   ext_req.write(body);
   ext_req.end();
 });

}

export const re_api = /^\/api\/.+/
