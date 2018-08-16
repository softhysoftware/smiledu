async function miFuncion(req, res) {
    try {
        let result = await M_utils.function_BD();
        let res    = await funcionLogica();
        //logica posterior...
        return res.status(global.HTTP_200).send(rpta); 
    } catch (err) {
        if(err.status) return res.status(global.HTTP_400).send(err);
        print_response_error(req.url, err, res);
    }
}

function function_BD() {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM tabla`;
        dbp.any(sql).then(data => {
            resolve(data);
        }).catch(err => {
            reject({ msj : global.MSJ_ERROR, err : err });
        });
    });
}

function funcionLogica() {
    return new Promise( async (resolve, reject) => {
        let res = await modelo.traerData();
        if(res.valor == 'x') {
            return reject({ msj : 'Mensaje de error', status : global.HTTP_400 });
        }
        //..... mas logica ...
        resolve({ msj : 'Todo ok' });
    });
}

async function funcionLogica_Otro() {
    let res = await modelo.traerData();
    if(res.valor == 'x') {
        throw { msj : 'Mensaje de error', status : global.HTTP_400 };
    }
    //..... mas logica ...
    return { msj : 'Se registró su información', data : res };
}