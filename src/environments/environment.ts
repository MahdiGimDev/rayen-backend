let production = false;
const backend = 'http://localhost:4004';
const frontend = 'http://localhost:4200';
const uploadPath = 'C:\\wamp64\\www'; // 'C:\\wamp\\www'
const uploadFolder = 'uploads';
const uploadFolder2 = 'uploads';

const uploadUrl = 'http://localhost:8080';
const mailer = 'mahdi.hamrouni@esprit.tn'; // your Send grid email mhd@flp.tn
if (process.env.NODE_ENV == 'dev') {
}

if (process.env.NODE_ENV == 'prod') {
  production = true;
  production = true;
}

export const environment = {
  production,
  backend,
  frontend,
  mailer,
  uploadFolder,
  uploadFolder2,
  uploadPath,
  uploadUrl,
};
