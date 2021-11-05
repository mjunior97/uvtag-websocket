var WebSocketServer = require('websocket').server;
var http = require('http');
const Leitura = require('./models/Leitura');
const Evento = require('./models/Evento');
const db = require('./models/db');
 
//Porta que o server irá escutar
const port = 3334;

//Cria o server
var server = http.createServer();

//Server irá escutar na porta definida em 'port'
server.listen(port, () => {
    //Server está pronto
    //console.log(`Server está executando na porta ${server}`);
    console.log(`Server está executando na porta ${port}`);
    // var user = await Usuario.findAll();
    // console.log(user);
});

//Cria o WebSocket server
wsServer = new WebSocketServer({
  httpServer: server
});

//Chamado quando um client deseja conectar
wsServer.on('request', (request) => {

    //console.log(request)

    //Aceita a conexão do client
    let client = request.accept(null, request.origin);

    console.log(client)

    //Chamado quando o client envia uma mensagem
    client.on('message', (message) => {
        //Se é uma mensagem string utf8
        if (message.type === 'utf8') {
            //Mostra no console a mensagem
            //console.log(message.utf8Data);
            var stringReceived = message.utf8Data;
            console.log("Valor Recebido: "+stringReceived);
            if(stringReceived){
                var stringPost = stringReceived.split('?');
                var tabela_recebida = parseInt(stringPost[0]);
                switch(tabela_recebida){
                // 0 = eventos
                // 1 = leituras    
                    case 0:
                        Evento.max('id').then(function(max){
                            var controladorid_recebido = stringPost[1];
                            var evento_recebido = stringPost[2];
                            Evento.create({
                                id: max+1,
                                controlador_id: controladorid_recebido,
                                evento: evento_recebido
                            });
                        });
                        break;
                    case 1:
                        //var registroid_recebido = parseInt(stringPost[1]);
                        Leitura.max('id').then(function(max){
                            var idmax = max+1;
                            var controladorid_recebido = stringPost[1];
                            var dispositivoid_recebido = stringPost[2];
                            var indiceuv_recebido = stringPost[3];
                            var dispositivodist_recebido = stringPost[4];   
                            Leitura.create({
                                id: max+1,
                                controlador_id: controladorid_recebido,
                                dispositivo_id: dispositivoid_recebido, 
                                indice_uv: indiceuv_recebido,
                                dispositivo_distancia: dispositivodist_recebido
                            });
                        });
                        Evento.max('id').then(function(max){
                            var controladorid_recebido = stringPost[1];
                            var evento_recebido = 'Leitura realizada';
                            Evento.create({
                                id: max+1,
                                controlador_id: controladorid_recebido,
                                evento: evento_recebido
                            });
                        });
                    default:
                        console.log("Dado inválido");
                }      
            } else console.log('dado nao recebido');
         }
    });

    //Chamado quando a conexão com o client é fechada
    client.on('close', () => {
        console.log("Conexão fechada");
        //Remove o intervalo de envio de estado
    });
});