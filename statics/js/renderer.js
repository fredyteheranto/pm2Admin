var nodemiral = require('nodemiral');
var request = require('request');

var servidores = null
var session = nodemiral.session('129.213.181.81', {
	username: '****',
	password: '*****'
});
// PM2_API_PORT=7100 pm2 web


var template = document.getElementById('template').innerHTML;

function traerData() {
	request('https://pm2.adnerp.net', function (error, response, body) {
		servidores = JSON.parse(body)
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
		var crear = document.getElementById('auth-button-create');
		var reiniservice = document.getElementById('auth-button-reiniciar-servicio')
		//rechargar.style.display = "none";


		restart.addEventListener('click', function () {
			document.getElementById("servid").innerHTML = 'Reiniciando Todos los Servicios....'
			session.execute("pm2 restart all", function (err, code, logs) {
				//	console.log('ejecutando', err, code, logs)
				if (logs.stdout) {
					document.getElementById("servid").innerHTML = logs.stdout;
				}
			});
		});

		crear.addEventListener('click', function () {
			console.log('creo server')
		});


		var dat = $('.databuton')
		dat.on('click', function () {
			var wm = $(this).text()
			var idli = $(this).attr('id')
			var deployid = $(this).attr('data-deploy')
			$('#nameservi').html(wm)
			var objDiv = document.getElementById("servid");


			document.getElementById("servid").innerHTML = 'Cargando log de ' + wm + '...';
			session.execute("tail -n 30  /home/opc/.pm2/logs/" + wm + "-out.log", function (err, code, logs) {
				if (logs.stdout) {
					document.getElementById("servid").innerHTML = logs.stdout;
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

						session.execute("cd  " + deploud + "&&  git pull --no-edit && tail -n 30  /home/opc/.pm2/logs/" + wm + "-out.log", function (err, code, logs) {

							console.log(err, code, logs)
							if (logs.stdout) {
								document.getElementById("servid").innerHTML = logs.stdout;
								objDiv.scrollTop = objDiv.scrollHeight;
							}
						});
					})



					$('.serv').on('click', function () {
						var servidor = $(this).attr("data-server")
						document.getElementById("servid").innerHTML = 'Reiniciando ' + wm;
						session.execute("pm2 restart " + servidor, function (err, code, logs) {

							console.log(err, code, logs)
							if (logs.stdout) {
								document.getElementById("servid").innerHTML = logs.stdout;
								objDiv.scrollTop = objDiv.scrollHeight;
							}
						});
					})

					$('#rec-' + wm).on('click', function () {
						document.getElementById("servid").innerHTML = 'Recargando log de ' + wm;
						session.execute("tail -n 30 /home/opc/.pm2/logs/" + wm + "-out.log", function (err, code, logs) {
							console.log('ejecutando', err, code, logs)
							if (logs.stdout) {
								document.getElementById("servid").innerHTML = logs.stdout;
								objDiv.scrollTop = document.getElementById("servid").scrollHeight;
							}
						});
					})

					//rechargar.style.display = "block";
				}
			});
		})



	});
}

traerData()


/*	session.execute(`sudo su
    cd /var/www/apicopia2 &&  git pull --no-edit && 
    cd /var/www/apiDelvecchio  &&  git pull --no-edit && 
    cd /var/www/apidev &&  git pull --no-edit && 
    cd /var/www/apiprod &&  git pull --no-edit && 
    cd /var/www/apiredfred &&  git pull --no-edit && 
    cd /var/www/apitecinf &&  git pull --no-edit && 
    cd /var/www/apitfco &&  git pull --no-edit && 
    cd /var/www/apicopia5 &&  git pull --no-edit && 
    cd /var/www/apicopia3 &&  git pull --no-edit && 
    cd /var/www/apicelsus && git pull--no - edit && pm2 log `, function (err, code, logs) {
		if (logs.stdout) {
			document.getElementById("servidores").innerHTML = logs.stdout;
		}
	});*/
