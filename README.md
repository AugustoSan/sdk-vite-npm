
# sdk-vite-npm  
  Libreria para el consumo de smart contracts en la blockchain.  

  ## Requisitos  
  * NodeJS

  ## Instalación 
  ### VainillaJS 
  Para su instalacion solicite el archivo *.js*.
  ```html
  <!DOCTYPE html>
  <html>
      <head>
          <meta charest="utf-8" />
          <title>Hello world!</title>
      </head>
      <body>
        <!-- Aqui su codigo -->
        <script type="module">
            import {DicioBlockchain} from "{URL o ruta de archivo JS}";
            const instace = new DicioBlockchain({abiSmartContract: '', addressSmartContract: '0x...', enviroment: 'PROD'});
        </script>
      </body>
  </html>
  ```

  ### NodeJS, ReactJS, Angular
  ```javascript
    import { DicioBlockchain } from 'sdk-vite-npm';

    const instace = new DicioBlockchain({
        abiSmartContract: '',
        addressSmartContract: '0x...',
        enviroment: 'PROD'
    });
  ```
  ## Uso  

  ```javascript
 
    // Para leer del smart contract
    const response = await instace.contractRead({
        functionName,
        params
    });

    // Para realizar transacciones en el smartcontract
    const response = await instace.contractWrite({
        functionName,
        params
    });
```
## Nota ✨  
  Por el momento solo se puede usar con una instancia de window.ethereum y no se tiene un CDN para la libreria

## Dependencias
  [ethers js](https://docs.ethers.org/v6/getting-started/)
  