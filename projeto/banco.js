//definindo as rotas
const express = require('express');
const mysql = require('mysql');

module.exports = {
    index(req, res) {

        const { questao } = req.params;

        const connection = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'carl4',
            database: 'desafio_selecao'
        });

        //  QUESTAO 01 Quantos órgãos responderam à pesquisa, por ano?
        if(questao=='questao1'){
            connection.connect(function (err) {
                if (err) throw err;
                connection.query('SELECT sum(if(ano_diagnostico=2019, true, FALSE)) AS a19, sum(if(ano_diagnostico=2018, true, FALSE)) AS a18 , sum(if(ano_diagnostico=2017, true, FALSE)) AS a17 FROM `respostas_diagnostico` WHERE  `orgao` != "" AND `data_submissao` != "";', function (err, result, fields) {
                    if (err) throw err;
                    
                    res.json(result);
                    console.log(result);
                });
            });
        }else if(questao=='questao2'){
            connection.connect(function (err) {
                if (err) throw err;
                connection.query('SELECT SUM(if(ano_diagnostico=2019, qtd_equipe, FALSE)) AS equipe_19, SUM(if(ano_diagnostico=2018, qtd_equipe, FALSE)) AS equipe_18, SUM(if(ano_diagnostico=2017, qtd_equipe, FALSE)) AS equipe_17 FROM `respostas_diagnostico` WHERE `data_submissao` != "" ', function (err, result, fields) {
                    if (err) throw err;
                    res.json(result);
                    console.log(result);
                });
            });
        }else if(questao=='questao3'){
            connection.connect(function (err) {
                if (err) throw err;
                connection.query('SELECT orgao ,  SUM(if(ano_diagnostico=2019,qtd_equipe,FALSE))*2500*12 AS gastos_ti_19, SUM(if(ano_diagnostico=2018,qtd_equipe,FALSE))*2500*12 AS gastos_ti_18, SUM(if(ano_diagnostico=2017,qtd_equipe,FALSE))*2500*12 AS gastos_ti_17 FROM `respostas_diagnostico` WHERE `orgao` != "" AND `data_submissao` != "" GROUP BY orgao ', function (err, result, fields) {
                    if (err) throw err;
                    
                    res.json(result);
                    console.log(result);
                });
            });

        }else if(questao=='questao4'){
            connection.connect(function (err) {
                if (err) throw err;
                connection.query('SELECT SUM(IF(utiliza_metodologia = 1, TRUE, FALSE)) AS utilizam_metodologias, SUM(IF(utiliza_metodologia = 0, TRUE, FALSE)) AS nao_utilizam_metodologias FROM `respostas_diagnostico` WHERE `orgao` != "" AND `data_submissao` != "" ;', function (err, result, fields) {
                    if (err) throw err;
                    
                    res.json(result);
                    console.log(result);
                });
            });
        }else if(questao=='questao5'){
            connection.connect(function (err) {
                if (err) throw err;
                connection.query('SELECT SUM(if(ano_diagnostico=2019, desktop_proprio + desktop_locado + desktop_proprio_antigo, FALSE)) AS computadores_2019, SUM(if(ano_diagnostico=2018, desktop_proprio + desktop_locado + desktop_proprio_antigo, FALSE)) AS computadores_2018, SUM(if(ano_diagnostico=2017, desktop_proprio + desktop_locado + desktop_proprio_antigo, FALSE)) AS computadores_2017  FROM `respostas_diagnostico` WHERE  `data_submissao` != "" ;', function (err, result, fields) {
                    if (err) throw err;
            
                    res.json(result);
                    console.log(result);
                });
            });
        }else if(questao=='questao6'){
            connection.connect(function (err) {
                if (err) throw err;
                connection.query('SELECT SUM( desktop_proprio + desktop_proprio_antigo) AS usados, SUM(desktop_locado) AS novos FROM   `respostas_diagnostico` ;', function (err, result, fields) {
                    if (err) throw err;
            
                    res.json(result);
                    console.log(result);
                });
            });
        }

    }
} 
