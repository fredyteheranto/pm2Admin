var nodemiral = require('nodemiral');
var request = require('request');
require('dotenv').config()

var ips = process.env.IPSERVER
var usr = process.env.USERSERVER
var pas = process.env.KEYPASS

console.log('setvariable', ips, usr, pas)

var servidores = null
var session = nodemiral.session(ips, {
	username: usr,
	password: pas
});
// PM2_API_PORT=7100 pm2 web

// api-Key = dKsvGpGdPygo_GxLggLx8y1LEkgmc37QPx4
// api-Secret = GxM4tsbnwvkjVUFsYZ2hJ8



var template = document.getElementById('template').innerHTML;

function traerData() {
	request('https://pm2.adnerp.net', function (error, response, body) {
		servidores = JSON.parse(body)

		if (servidores) {
			document.getElementById('loader').style = 'display:none';
			//document.getElementById('loders').style = 'display:none';


			var compiled_template = Handlebars.compile(template);
			console.log('---ª', servidores)
			//Render the data into the template
			var rendered = compiled_template({
				name: servidores.system_info.hostname,
				power: servidores.system_info.uptime,
				people: servidores.processes

			});


			document.getElementById('menu').innerHTML = rendered;

			var restart = document.getElementById('auth-button-restart');
			var deployServer = document.getElementById('auth-button-deploy');
			var crear = document.getElementById('auth-button-create');
			var reiniservice = document.getElementById('auth-button-reiniciar-servicio')



			//rechargar.style.display = "none";

			deployServer.addEventListener('click', function () {


				document.getElementById("servid").innerHTML = 'Estamos realizando Deploy para todas las APIs  🤖DavidBot no se debe cerrar!  🙏🏾';
				document.getElementById('loader').style = 'display:block';
				document.getElementById('text').innerHTML = 'Realizando Deploy';
				session.execute("cd /var/www && cd apicelsus &&  sudo git pull --no-edit  && npm i && cd .. &&  cd apicopia2   && npm i  &&  sudo git pull --no-edit  &&  sudo npm i  && cd .. &&  cd apicopia3 &&  sudo git pull --no-edit &&  sudo npm i && cd .. &&  cd apicopia5 &&  sudo git pull --no-edit &&  sudo npm i && cd .. &&  cd apiDelvecchio &&  sudo git pull --no-edit &&  sudo npm i && cd .. &&  cd apidev &&  sudo git pull --no-edit &&  sudo npm i && cd .. &&  cd apifelder &&  sudo git pull --no-edit &&  sudo npm i && cd .. &&  cd apimaxtech &&  sudo git pull --no-edit &&  sudo npm i && cd .. &&  cd apipanelco &&  sudo git pull --no-edit &&  sudo npm i && cd .. &&  cd apipos &&  sudo git pull --no-edit && cd .. &&  cd apiprod &&  sudo git pull --no-edit &&  sudo npm i && cd .. &&  cd apipymes &&  sudo git pull --no-edit &&  sudo npm i && cd .. &&  cd apiraip &&  sudo git pull --no-edit &&  sudo npm i && cd .. &&  cd apiredfred  &&  sudo git pull --no-edit &&  sudo npm i  && cd .. &&  cd apiserticol &&  sudo git pull --no-edit &&  sudo npm i && cd .. &&  cd apitecinf &&  sudo git pull --no-edit &&  sudo npm i && cd .. &&  cd apitecniisuzu &&  sudo git pull --no-edit &&  sudo npm i && cd .. &&  cd  apitfco &&  sudo git pull --no-edit &&  sudo npm i && cd .. && cd pos &&  git pull --no-edit && ionic build and ionic build && cd .. && cd delvecchiopos  &&  git pull --no-edit &&  sudo npm i && ionic build and ionic build &&  pm2 restart all && cd /var/www", function (err, code, logs) {
					console.log(err, code, logs)
					if (logs.stdout) {
						var objDiv = document.getElementById("servid");
						document.getElementById("servid").innerHTML = logs.stdout + '🎊 🎉';
						document.getElementById('loader').style = 'display:none';
						objDiv.scrollTop = objDiv.scrollHeight;
						alert('Deploy realizado con Exito... 🤟🏾 👌🏾 🎊 🎉')
					}
				});
			})


			restart.addEventListener('click', function () {
				document.getElementById("servid").innerHTML = 'Reiniciando Todos los Servicios.... ✍️ 👷🏻 espera por favor 🙏🏾'
				document.getElementById('loader').style = 'display:block';
				document.getElementById('text').innerHTML = 'Reiniciando Servicios';
				session.execute("pm2 restart all", function (err, code, logs) {
					//	console.log('ejecutando', err, code, logs)
					if (logs.stdout) {
						document.getElementById("servid").innerHTML = logs.stdout;
						document.getElementById('loader').style = 'display:none';
					}
				});
			});

			crear.addEventListener('click', function () {

				var schema = document.getElementById("schema").value
				var puerto = document.getElementById("puerto").value

				if (schema && puerto) {
					document.getElementById("servid").innerHTML = 'Un Momento por favor estamos creando un servicio 🤖';
					document.getElementById('loader').style = 'display:block';
					document.getElementById('text').innerHTML = 'Creando Servicio';
					var newserver = `"
#${schema}

server {
	listen 80;
	server_name ${schema}api.adnerp.net;
	return 301 https://&&&&host&&&&request_uri;
}

server {
	listen 443 ssl;

	server_name ${schema}api.adnerp.net;
	ssl_certificate     /etc/nginx/ssl/adnerp.crt;
	ssl_certificate_key /etc/nginx/ssl/adnerp.key;

	location / {
		proxy_pass http://127.0.0.1:${puerto};
		proxy_http_version 1.1;
		proxy_set_header Upgrade &&&&http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host &&&&host;
		proxy_cache_bypass &&&&http_upgrade;
	}

}
"`;

					var parametersjson = `"const serve = require('koa-static-server');
var koa = require('koa');
const cors = require('@koa/cors');
var app = new koa();
app.context['squema']='celsus'
app.context.parameters = require('./parameters')
app.use(require('./app/utils')())
app.use(require('koa-body')({
	multipart: true
}));
app.use(serve({
	rootDir: 'web/img/adnimg',
	rootPath: '/web/img/adnimg'
}))
require('./app/session')(app);
app.use(require('./app/accessControl')(app));
app.use(require('./app/auth')(app));
app.use(require('./app/database')(app));
app.use(require('./app/template')(app));
var router = require('./app/router')(app)
app.use(router.routes())
app.use(router.allowedMethods());
var port = ${puerto};
console.log('Servidor iniciado, Escuchando en el puerto: ' + port);
app.listen(port);"`

					var culrapi = `curl -X PATCH *https://api.godaddy.com/v1/domains/adnerp.net/records* -H *accept: application/json* -H *Content-Type: application/json* -H *Authorization: sso-key dKsvGpGdPygo_GxLggLx8y1LEkgmc37QPx4:GxM4tsbnwvkjVUFsYZ2hJ8* --data '[ { \*data\*: \*129.213.181.81\*, \*name\*: \*${schema}api\*, \*port\*: 80, \*priority\*: 1, \*protocol\*: \*string\*, \*service\*: \*string\*, \*ttl\*: 3600, \*type\*: \*A\*, \*weight\*: 1 }]'`

					var culr = `curl -X PATCH *https://api.godaddy.com/v1/domains/adnerp.net/records* -H *accept: application/json* -H *Content-Type: application/json* -H *Authorization: sso-key dKsvGpGdPygo_GxLggLx8y1LEkgmc37QPx4:GxM4tsbnwvkjVUFsYZ2hJ8* --data '[ { \*data\*: \*129.213.181.81\*, \*name\*: \*${schema}\*, \*port\*: 80, \*priority\*: 1, \*protocol\*: \*string\*, \*service\*: \*string\*, \*ttl\*: 3600, \*type\*: \*A\*, \*weight\*: 1 }]'`

					session.execute(`cd /home/davidbot/ && echo "${culr}" >>  default.sh && sed -i -e 's/*/"/g' /home/davidbot/default.sh && sh default.sh && rm -rf default.sh  && echo "${culrapi}" >>  default.sh && sed -i -e 's/*/"/g' /home/davidbot/default.sh && sh default.sh && rm -rf default.sh && rm -rf /home/davidbot/default.conf && cp /etc/nginx/conf.d/default.conf  /home/davidbot/default.conf && cd /home/davidbot &&  echo ${newserver} >>  default.conf && sed -i -e "s/&&&&/$/g" /home/davidbot/default.conf && sudo cp default.conf /etc/nginx/conf.d/default.conf && sudo systemctl restart nginx && cd /var/www/ &&  git clone http://192.168.10.24/adn30/api.git api${schema} && cd api${schema} &&  git checkout desarrollo  && npm install && chmod -R 777 node_modules/ &&  echo ${parametersjson} >>  servidorAPi${schema}.js && cp /var/www/parameters.json /var/www/api${schema}/parameters.json && pm2 start servidorAPi${schema}.js  `,
						function (err, code, logs) {
							console.log('ejecutando', err, code, logs)
							if (logs.stdout || logs.stdout == '') {
								document.getElementById("servid").innerHTML = logs.stdout + 'Se creo Servicio con Exito  Puedes probar en : https://' + schema + '.adnerp.net  👍 🎊 🎉 🎊 🎉🎊 🎉🎊 🎉';
								document.getElementById('loader').style = 'display:none';
							}
						});
				} else {
					alert('No Puedes Crear un sistema sin los datos requeridos... 👎 ')
					document.getElementById("servid").innerHTML = 'Haga click en Crear sistema nuevamente...👎 ';
				}

			});


			var dat = $('.databuton')
			dat.on('click', function () {
				var wm = $(this).text().trim()
				var idli = $(this).attr('id')
				var deployid = $(this).attr('data-deploy')
				$('#nameservi').html(wm)
				var objDiv = document.getElementById("servid");


				document.getElementById("servid").innerHTML = 'Cargando log de: ' + wm + '...';
				document.getElementById('loader').style = 'display:block';
				document.getElementById('text').innerHTML = 'Cargando Log';
				console.log('......>>>', wm, "tail -n 30 /home/opc/.pm2/logs/" + wm + "-out.log")
				//	setInterval(function () {tail -n 30  /home/opc/.pm2/logs/servidorAPitecinf-out.log
				session.execute("tail -n 30 /home/opc/.pm2/logs/" + wm + "-out.log", function (err, code, logs) {
					console.log('......', logs)
					if (logs) {
						document.getElementById("servid").innerHTML = logs.stdout;
						document.getElementById('loader').style = 'display:none';

						$('.serv').css({
							'display': 'block'
						})
						$('.rec').css({
							'display': 'block'
						})
						$('.dep').css({
							'display': 'block'
						})
						$(".rec").attr('id', 'rec-' + wm);
						$(".rec").attr('data-server-rec', idli);

						$(".serv").attr('id', 'sev-' + idli);
						$(".serv").attr('data-server', idli);

						$(".dep").attr('data-server-de', deployid);

						$('.dep').on('click', function () {
							var deploud = $(this).attr("data-server-de")

							document.getElementById("servid").innerHTML = 'Realizando Deploy de  ' + wm;
							document.getElementById('loader').style = 'display:block';
							document.getElementById('text').innerHTML = 'Deploy de ' + wm;

							session.execute("cd  " + deploud + "&& sudo git pull --no-edit && tail -n 30  /home/opc/.pm2/logs/" + wm + "-out.log", function (err, code, logs) {

								console.log(err, code, logs)
								if (logs.stdout) {
									document.getElementById("servid").innerHTML = logs.stdout;
									objDiv.scrollTop = objDiv.scrollHeight;
									document.getElementById('loader').style = 'display:none';
								}
							});
						})
						$('.serv').on('click', function () {
							var servidor = $(this).attr("data-server")
							document.getElementById("servid").innerHTML = 'Reiniciando ' + wm;
							document.getElementById('loader').style = 'display:block';
							document.getElementById('text').innerHTML = 'Reiniciando ' + wm;
							session.execute("pm2 restart " + servidor, function (err, code, logs) {
								console.log(err, code, logs)
								if (logs.stdout) {
									document.getElementById("servid").innerHTML = logs.stdout;
									objDiv.scrollTop = objDiv.scrollHeight;
									document.getElementById('loader').style = 'display:none';

								}
							});
						})

						$('#rec-' + wm).on('click', function () {
							document.getElementById("servid").innerHTML = 'Recargando log de ' + wm;

							//	setInterval(function () {
							document.getElementById("servid").innerHTML = '';
							session.execute("tail -n 20 /home/opc/.pm2/logs/" + wm + "-out.log", function (err, code, logs) {
								console.log('ejecutando', err, code, logs)
								if (logs.stdout) {
									document.getElementById("servid").innerHTML = logs.stdout;
									objDiv.scrollTop = document.getElementById("servid").scrollHeight;
								}
							});
							//	}, 3000);
						})

						//rechargar.style.display = "block";
					}
				});

			})


		} else {
			document.getElementById('text').innerHTML = 'ADN 3.0 NO RESPONDE';
			document.getElementById('dataserver').innerHTML = 'Verifique su conexion a Internet, reinicie el Bot o contacte al Desarrollador del BOT : fredyteheran91@gmail.com';
			//	document.getElementById('menu').style = 'display:none';
		}
	});

}

traerData()