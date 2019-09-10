import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import './App.css';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export default function App() {
  const [questao, setQuestao] = useState(1);
  const [resposta, setResposta] = useState([]);

  useEffect(() => {

    async function loadQuestao() {
      const response = await api.get(`/questao${questao}`);
      const parsed = response.data;
      setResposta(parsed[0]);
      console.log(parsed[0]);
    }
    loadQuestao();

  }, [questao]);


  return (
    <div>
      <nav>
        <button id="questoes" onClick={() => setQuestao(1)}> Questao 01</button>
        <button id="questoes" onClick={() => setQuestao(2)}> Questao 02</button>
        {/* <button id="questoes" onClick={() => setQuestao(3)}> Questao 03</button> */}
        <button id="questoes" onClick={() => setQuestao(4)}> Questao 04</button>
        <button id="questoes" onClick={() => setQuestao(5)}> Questao 05</button>
        <button id="questoes" onClick={() => setQuestao(6)}> Questao 06</button>
      </nav>
      <h2>Clique nos botoes para gerar os seus respectivos graficos</h2>


      <div id="respostas">
        <h1>Questao 1</h1>
        <Chart
          width={'70vw'}
          height={'40vh'}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Ano", "Quantidade de Orgaos"],
            ['2019', Number(resposta.a19)],
            ['2018', Number(resposta.a18)],
            ['2017', Number(resposta.a17)],
          ]}
          options={{
            title: 'Quantidade de orgãos que responderam a entrevista por ano',
            chartArea: { width: '40%' },
            hAxis: {
              title: 'Ano',
            },
            vAxis: {
              title: 'Quant. de Orgãos',
            },
          }}
          legendToggle
        />
      </div>

      <div id="respostas">
        <h1>Questao 2</h1>
        <Chart
          width={'70vw'}
          height={'40vh'}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Ano", "Quantidade de Orgaos"],
            ['2019', Number(resposta.equipe_19)],
            ['2018', Number(resposta.equipe_18)],
            ['2017', Number(resposta.equipe_17)],
          ]}
          options={{
            title: 'Quantidade de pessoas que trabalharam de forma dedicada a TI por ano.',
            chartArea: { width: '40%' },
            hAxis: {
              title: 'Ano',
            },
            vAxis: {
              title: 'Quant. de Pessoas',
            },
          }}
          legendToggle
        />
      </div>

      <div id="respostas">
        <h1>Questao 3</h1>
        <p>Nao consigo usar o metodo de json (.map), entretanto aqui envio o codigo sql que usei para gera-lo.</p>
        <p>SELECT orgao ,  SUM(if(ano_diagnostico=2019,qtd_equipe,FALSE))*2500*12 AS gastos_ti_19, SUM(if(ano_diagnostico=2018,qtd_equipe,FALSE))*2500*12 AS gastos_ti_18, SUM(if(ano_diagnostico=2017,qtd_equipe,FALSE))*2500*12 AS gastos_ti_17 FROM `respostas_diagnostico` WHERE `orgao` != "" AND `data_submissao` != "" GROUP BY orgao </p>
      </div>

      <div id="respostas">
        <h1>Questao 4</h1>
        <Chart
          width={'70vw'}
          height={'40vh'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Task', 'Quantidade'],
            ['Usam', Number(resposta.utilizam_metodologias)],
            ['Nao Usam', Number(resposta.nao_utilizam_metodologias)],
          ]}
          options={{
            title: 'Orgãos que utilizam ou nao metodologias para o gerenciamento de projetos.',
            is3D: true,
          }}
          rootProps={{ 'data-testid': '2' }}
        />
      </div>

      <div id="respostas">
        <h1>Questao 5</h1>
        <Chart
          width={'70vw'}
          height={'40vh'}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Year', 'Total de Computadores'],
            ['2019', Number(resposta.computadores_2019)],
            ['2018', Number(resposta.computadores_2018)],
            ['2017', Number(resposta.computadores_2017)],
          ]}
          options={{
            // Material design options
            chart: {
              title: 'Total de computadores por ano.',
              subtitle: 'A soma entre os computadores proprios, locados e proprios antigos.',
              chartArea: { width: '40%' },
              hAxis: {
                title: 'Ano',
              },
              vAxis: {
                title: 'Quant. de Computadores',
              },
            },
          }}
        />
      </div>


      <div id="respostas">
        <h1>Questao 6</h1>
        <Chart
          width={'70vw'}
          height={'40vh'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Task', 'Quantidade'],
            ['Mais 5 anos', Number(resposta.usados)],
            ['Menos 5 anos', Number(resposta.novos)],
          ]}
          options={{
            title: 'Computadores usados com mais e menos de 5 anos.',
          }}
          rootProps={{ 'data-testid': '2' }}
        />
      </div>

      <div id="respostas">
        <h1>Questao 7:</h1>
        <p>"De acordo com o Diagnóstico de 2019, metade dos órgãos setoriais da prefeitura possui, no máximo, <strong>32</strong> pessoas trabalhando de forma dedicada à área de TI"</p>
      </div>

    </div>
  );
}
