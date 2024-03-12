
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
            import {DicioBlockchain, DicioBlockchainAPI} from "{URL o ruta de archivo JS}";
            
            // Con Wallet ethereum
            const instace = new DicioBlockchain({
              abiSmartContract: '', 
              addressSmartContract: '0x...', 
              enviroment: 'prod',
              useType: 'frontend'
            });

            // Con llave privada ethereum y nodo
            const instace = new DicioBlockchain({
              abiSmartContract: '', 
              addressSmartContract: '0x...', 
              enviroment: 'prod',
              useType: 'frontend',
              urlNode = '', 
              privateKey = ''
            });

            // Mediante API
            const apiInstance = new DicioBlockchainAPI({
              baseURL: '', 
              port: '', 
              raiz: ''
            });
        </script>
      </body>
  </html>
  ```

  ### NodeJS, ReactJS, Angular
  ```javascript
    import { DicioBlockchain, DicioBlockchainAPI } from 'sdk-vite-npm';

    // Con Wallet ethereum
    const instace = new DicioBlockchain({
      abiSmartContract: '', 
      addressSmartContract: '0x...', 
      enviroment: 'prod',
      useType: 'frontend'
    });

    // Con llave privada ethereum y nodo
    const instace = new DicioBlockchain({
      abiSmartContract: '', 
      addressSmartContract: '0x...', 
      enviroment: 'prod',
      useType: 'frontend',
      urlNode = '', 
      privateKey = ''
    });

    // Mediante API
    const apiInstance = new DicioBlockchainAPI({
      baseURL: '', 
      port: '', 
      raiz: ''
    });
  ```
  ## Uso  

  ```javascript
 
    // Con wallet ethereum o llave privada
    const response = await instace.contractRead({
        functionName,
        params
    });

    // Para realizar transacciones en el smartcontract
    const response = await instace.contractWrite({
        functionName,
        params
    });

    // Sin wallet ethereum o llave privada
    const response = await apiInstance.contractReadAPI({
        endpoint: '',
        token: ''
    });

    // Para realizar transacciones en el smartcontract
    const response = await apiInstance.contractWriteAPI({
        endpoint: '',
        token: '',
        data
    });
```
## Nota ✨  
  Para usarlo en backend debe agregar las variables *urlNode*, *privateKey* y cambiar *useType*.
  Para ambientes *dev* y *test* aun no tiene habilitado nada, es una libreria de prueba.

  Por ejemplo: 
  
  ```javascript
const instace = new DicioBlockchain({
    abiSmartContract: '', 
    addressSmartContract: '0x...', 
    enviroment: 'prod',
    useType: 'backend',
    urlNode = '', 
    privateKey = ''
});
    
```
Tipos aceptables
  ```javascript
enviroment: 'prod' | 'dev' | 'test';
useType: 'frontend' | 'backend';
    
```



## Dependencias
  [ethers js](https://docs.ethers.org/v6/getting-started/)
  