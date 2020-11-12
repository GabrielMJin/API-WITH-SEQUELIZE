const app = require('./config/express')();
const indexRoute = require('./app/routes/index');
const investidorRoute = require('./app/routes/investidor');
const investimentoRoute = require('./app/routes/investimento');

const host = app.get('host');
const port = app.get('port');

app.use(indexRoute);
app.use(investidorRoute);
app.use(investimentoRoute);

app.listen(port, host, () => { 
    console.log(`Servidor rodando na porta ${port}`);
});