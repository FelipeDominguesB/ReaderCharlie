# ReaderCharlie
Um leitor para a Web. Escrito em Angular.
## Sobre o projeto
Esse projeto foi criado por Felipe Domingues. O objetivo do projeto é criar um aplicativo de leitura para web, onde possa ser realizado facilmente o upload e compartilhamento de HQs e Mangas de maneira rápida e acessível. 

Essa aplicação foi desenvolvida como objeto de estudo do framework Angular, para desenvolvimento dos meus conhecimentos em integrações com serviços como o Firebase e, acima de tudo, como uma ambição pessoal de criar um produto que eu mesmo gostaria de usar.

## Como posso testar essa aplicação?
Você pode acessar a versão hospedada dessa aplicação [aqui](https://readerbeta-a1026.web.app/login).

Para testar em sua própria máquina, é recomendado ter configurado no seu ambiente de desenvolvimento a última versão do Node.Js, além de possuir acesso ao NPM. 
Para começar a testar, clone esse repositório em sua máquina. Após isso, você deve ir até o caminho [./reader-ui/src/environments](https://github.com/FelipeDominguesB/ReaderCharlie/tree/main/reader-ui/src/environments) e atualizar tanto os arquivos [environment.ts](https://github.com/FelipeDominguesB/ReaderCharlie/blob/main/reader-ui/src/environments/environment.ts) quanto [environment.prod.ts](https://github.com/FelipeDominguesB/ReaderCharlie/blob/main/reader-ui/src/environments/environment.prod.ts) com as chaves da sua aplicação Firebase. Após isso, volte à pasta [./reader-ui](https://github.com/FelipeDominguesB/ReaderCharlie/tree/main/reader-ui) e rode o comando `npm install`, seguido pelo comando `ng serve`. Se tudo tiver sido executado corretamente, a aplicação deve estar agora hospedada no endereço `http://localhost:4200`
