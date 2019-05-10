pragma solidity ^0.5.0;

contract IdentitiesChain {
    
    struct Usuario{
        string usuario;
        string clave;
        Cedula cedula;
    }
    
    struct Cedula{
        string nombre;
        string fecha;
        string sexo;
        string ciudad;
        string departamento;
        string url;
    }

    struct Documento{
        string nombre;
        string url;
    }

    struct Permiso{
        address duenio;
        address destinatario;
        string[] docs; 
    }
    
    address usuarioActivo;
    mapping(address => Usuario) usuarios;
   
   constructor() public {}
   
   function iniciarSesion(string memory _usuario, string memory _clave) public returns(bool){
       require(keccak256(abi.encodePacked((usuarios[msg.sender].usuario))) == keccak256(abi.encodePacked((_usuario))) && keccak256(abi.encodePacked((usuarios[msg.sender].clave))) == keccak256(abi.encodePacked((_clave))) );
       usuarioActivo = msg.sender;
       return true;
   }
   
   function nuevoUsuario(string memory _usuario, string memory _clave) public {

        //Usuario memory user;
        //user = usuarios[msg.sender];
        usuarios[msg.sender].usuario = _usuario;
        usuarios[msg.sender].clave = _clave;
    }
    
    function getUsuario() public view returns(string memory) {
        return usuarios[msg.sender].usuario;
    }
    
    function nuevaCedula(string memory _nombre, string memory _fecha, string memory _sexo, string memory _ciudad, string memory _departamento, string memory _url) public {

        //Cedula memory _cedula = usuarios[usuarioActivo].cedula;
        usuarios[usuarioActivo].cedula.nombre = _nombre;
        usuarios[usuarioActivo].cedula.fecha = _fecha;
        usuarios[usuarioActivo].cedula.sexo = _sexo;
        usuarios[usuarioActivo].cedula.ciudad = _ciudad;
        usuarios[usuarioActivo].cedula.departamento = _departamento;
        usuarios[usuarioActivo].cedula.url = _url;
    }
    
    function getCedula() public view returns(string memory, string memory, string memory, string memory, string memory, string memory, address){
        //Cedula memory _cedula = usuarios[usuarioActivo].cedula;
        return (usuarios[usuarioActivo].cedula.nombre, usuarios[usuarioActivo].cedula.fecha, usuarios[usuarioActivo].cedula.sexo,
         usuarios[usuarioActivo].cedula.ciudad, usuarios[usuarioActivo].cedula.departamento, usuarios[usuarioActivo].cedula.url, usuarioActivo);
    }

    function compartir(address _destinatario) public {

    }
   
}