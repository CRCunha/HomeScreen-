const express = require('express');
const router = express.Router();

const bancoDeDados = require('./bancoDeDados');

// CADASTRA UM NOVO Post
router.post('/', (request, response) => {
    let titulo = request.body.titulo;
    let texto = request.body.texto;
    let tag = request.body.tag;
    
    bancoDeDados.conexao.query(`insert into Posts (titulo, texto, tag) values ('${titulo}', '${texto}', '${tag}')`, (erro, resposta) => {
        if (!erro)
            response.status(200).json({ Resposta: resposta });
        else
            response.status(400).json({ Erro: erro }).send();
    });
});

// RETORNA TODAS OS POSTS
router.get('/', (request, response) => {

    bancoDeDados.conexao.query('SELECT * FROM Posts ORDER BY id DESC', (erro, resultado) => {
        if (!erro) {
            response.status(200).json(resultado);
        }
        else {
            response.status(400).json({ erro: erro });
        }
    }); 
});

// DELETA AS CATEGORIAS INFORMADAS

// router.delete('/:id', (request, response) => {

//     // Se Deletado estiver em FALSE, a categoria não foi excluida, se estiver em TRUE, a categoria foi 'excluida' 
//     bancoDeDados.conexao.query(`select * from Categoria where Deletado = false and Id = ${request.params.id}`, (erro, resultado) => {
//         if (resultado.length > 0)
//             response.status(200).send('O id foi encontrado e Deletado com sucesso!');
//         else
//             response.status(404).json({ resultado: 'O id não foi encontrado!' });
//         if (!erro)
//             bancoDeDados.conexao.query(`update Categoria set Deletado = true where Id = ${request.params.id}`, (deletado, result) => {
//                 if (!deletado)
//                     response.status(200).send();

//                 else
//                     response.status(400).json({ deletado: deletado });


//             });

//     });
// });

// ATUALIZA A CATEGORIA INFORMADA

// router.put('/:id', (request, response) => {
//     bancoDeDados.conexao.query(`select * from Categoria where Deletado = false and Id = ${request.params.id}`,
//         (erro, resultado) => {
//             if (resultado.length === 0)
//                 response.status(404).send('Id informado não foi encontrado');
//             if (!erro)
//                 bancoDeDados.conexao.query(`update Categoria set Titulo = '${request.body.titulo}', 
//                Text = '${request.body.text}' where Id = ${request.params.id}`,
//                     (erro, resultado) => {
//                         if (erro)
//                             response.status(400).json({ erro: erro });
//                         else
//                             response.status(200).send('A categoria informada foi atualizada com sucesso!');
//                     });
//             else
//                 response.status(400).json({ Erro: erro });
//         });

// });

module.exports = (api) => api.use('/api/posts', router);