# Clean Architecture

## Camadas

### Domain Layer
A camada do dominio é onde ficam nossas regras de negócio, geralmente são uma interface ou seja uma representação da regra de negócio.
Nessa camada você define a regra como vai funcionar por exemplo sua autenticação.

OBS: o Domain é a camada principal do react, ele `não tem dependência de nenhuma outra camada`.

### Data Layer
O Data layer é as implementações dos casos de uso da aplicação ficam.

OBS: Essa camada possui dependência com a camada de `Domain`.

### Infra Layer
Na camada de infra geralmente ficam as implementações dos frameworks externos

OBS: A camada de `Infra` possui dependência com a camada de `Data`

### Presentation Layer
Na camada de Presentation é onde nossas ui ficam.

OBS: Essa camada possui dependência com a camada de`Domain`


### Validation Layer
A camada de Validation serve para agruparmos todos os nossos errors da aplicação.

OBS: Essa camada possui dependêcia da camada `Presentation`

### Main Layer
A camada de Main Layer é a camanda onde todas as outras camadas se acoplam para montar a aplicação.

OBS: A camada de `Main Layer` possui dependência de todas as outra camadas