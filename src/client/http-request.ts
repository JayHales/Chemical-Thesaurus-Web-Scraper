import http from 'http';
export default function httpRequest(host: string, path: string) {
    return new Promise<string>((resolve, reject) => {
    
          let data = '';
          
          const req = http.request({
            hostname: host,
            path: path,
            method: 'GET'
          }, res => {          
            res.on('data', d => {
              data += d;
            });
    
            res.on('end', () => {
                resolve(data);
            });
          })
          
          req.on('error', error => {
            reject(error);
          })
          
          req.end()
    })
    
}