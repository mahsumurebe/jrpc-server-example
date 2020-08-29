import RPCServer from '@mahsumurebe/jrpc-server';

// server sabitine RPCServer sınıfını tanımlıyoruz.
const server = new RPCServer({
    hostname: '127.0.0.1',
    port: 3000,
});


// parametre olarak iki tam sayıyı alan ve bu tam sayıları toplayan bir metod ekleyelim.
server.methods.add('toplama', (rakam1, rakam2) => {
    return parseInt(rakam1) + parseInt(rakam2);
});

// Hata fırlatan bir metod tanımlayalım.
server.methods.add('hata', () => {
    throw new Error('Bu benim hatam');
});


server.methods.add('help', () => {
    // Sunucuda tanımlanmış tüm metodların isimlerini döndürür.
    return server.methods.names();
});


// sunucumuza example isimli, parametre almayan ve çıktısı "Merhaba Dünya!" olan bir metod tanımladık.
server.methods.add('example', () => {
    return 'Merhaba Dünya !';
});
// metod içerisinde oluşan hataları dinliyoruz.
server.on('error', error => {
    console.error(`Metod içerisinde hata oluştu.`, error);
});

// Atılan istekleri dinleyelim
server.on('request', (method, params) => {
    console.debug(`>> Metod: \"${method}\"\n${(params ? '\tParametreler: ' + JSON.stringify(params) : '')}`);
});

// İsteklerin sonuçlarını dinleyelim
server.on('response', (data, method, params) => {
    if (data instanceof Error) {
        console.error(`<< (ERROR) Metod: \"${method}\"\n${(params ? '\tParametreler: ' + JSON.stringify(params) : '')}`, data);
    } else {
        console.debug(`<< Metod: \"${method}\"\n${(params ? '\tParametreler: ' + JSON.stringify(params) : '')}`, data);
    }
});

// ardından sunucumuzun istekleri dinlemesi için listen metodunu tetikliyoruz.
server.listen()
    .then(listener => {
        console.log(`Sunucu ${listener.toString()} üzerinden istekleri dinliyor.`);
    })
    .catch((e: Error) => {
        console.error(`Sunucu ayağı kaldırılırken hata oluştu.`, e);
    });

